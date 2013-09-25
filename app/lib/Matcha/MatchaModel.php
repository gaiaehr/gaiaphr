<?php
/**
 * Matcha::connect
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

class MatchaModel extends Matcha
{

    /**
     * Variables needed by MatchaModel
     */
    public static $__senchaModel;

    /**
     *
     */
    public static $tableId;

    /**
     * function SenchaModel($fileModel):
     * This method will create the table and fields if does not exist in the database
     * also this is the brain of the micro ORM.
     *
     * This method needs rework, this method has to be the brain!
     *
     */
    static public function __SenchaModel($fileModel)
    {
        // skip this entire routine if freeze option is true
        try
        {
			if(self::$__freeze)
            {
				self::$__senchaModel = self::__getSenchaModel($fileModel);
				return true;
			}

	        self::$__senchaModel = array();
            // check the difference in dates of the Sencha model file and the stored Sencha model on the server memory,
            // if there are equal go ahead and load the model from memory and quit the procedure
            if(self::__getFileModifyDate($fileModel) == MatchaMemory::__getSenchaModelLastChange($fileModel))
            {
                self::$__senchaModel = MatchaMemory::__getModelFromMemory($fileModel);
                return true;
            }

            // get the model of the table from the sencha .js file
            self::$__senchaModel = self::__getSenchaModel($fileModel);
            if(!self::$__senchaModel['fields']) return false;

            // Copy the table ID from the idProperty if the idProperty is undefined use "id" instead.
            self::$tableId = isset(self::$__senchaModel['idProperty']) ? self::$__senchaModel['idProperty'] : 'id';

            // check if the table property is an array, if not return the array is a table string.
            $table = (string)(is_array(self::$__senchaModel['table']) ? self::$__senchaModel['table']['name'] : self::$__senchaModel['table']);

            // verify the existence of the table if it does not exist create it
            $recordSet = self::$__conn->query("SHOW TABLES LIKE '".$table."';");
            if(isset($recordSet)) self::__createTable($table);

            // Remove from the model those fields that are not meant to be stored
            // on the database-table and remove the id from the workingModel.
            $workingModelFields = (array)self::$__senchaModel['fields'];

            // if id property is not set in sencha model look for propertyId.
            if($workingModelFields[MatchaUtils::__recursiveArraySearch(self::$tableId, $workingModelFields)] === false) unset($workingModelFields[MatchaUtils::__recursiveArraySearch(self::$tableId, $workingModelFields)]);
            foreach($workingModelFields as $key => $SenchaModel) if(isset($SenchaModel['store']) && $SenchaModel['store'] === false) unset($workingModelFields[$key]);

            // get the table column information and remove the id column
            $tableColumns = self::$__conn->query("SHOW FULL COLUMNS IN ".$table.";")->fetchAll(PDO::FETCH_ASSOC);
            unset($tableColumns[MatchaUtils::__recursiveArraySearch(self::$tableId, $tableColumns)]);

            $columnsTableNames = array();
            $columnsSenchaNames = array();

            // get all the column names of each model (Sencha and Database-table)
            foreach($tableColumns as $column) $columnsTableNames[] = $column['Field'];
            foreach($workingModelFields as $column) $columnsSenchaNames[] = $column['name'];

            // get all the column that are not present in the database-table
            $differentCreateColumns = array_diff($columnsSenchaNames, $columnsTableNames);
            $differentDropColumns = array_diff($columnsTableNames, $columnsSenchaNames);

            // unset the id field from both arrays
            unset($differentCreateColumns[MatchaUtils::__recursiveArraySearch('id', $differentCreateColumns)]);
            unset($workingModelFields[MatchaUtils::__recursiveArraySearch('id', $workingModelFields)]);

            // deal with the sencha triggers
            self::__diffTriggers(self::$__senchaModel);

            // check if the table has columns, if not create them.
            if( count($tableColumns) <= 1 )
            {
                self::__createAllColumns($workingModelFields);

                // add data - if the model has data defined.
                if(isset(self::$__senchaModel['table']['data']))
                {
                    $rec = self::$__conn->prepare('SELECT * FROM '.$table);
                    $rec->execute();
                    if($rec->rowCount() <= 0)
                    {
                        MatchaModel::__setSenchaModelData(MatchaModel::$__senchaModel['table']['data']);
                    }
                }
                return true;
            }

            // Verify that all the columns does not have difference
            // between field names
            elseif( count($differentCreateColumns) || count($differentDropColumns) )
            {
                // add columns to the table
                foreach($differentCreateColumns as $column) self::__createColumn($workingModelFields[MatchaUtils::__recursiveArraySearch($column, $workingModelFields)]);
                // remove columns from the table
                foreach($differentDropColumns as $column) self::__dropColumn( $column );
            }
            // if everything else passes, check for differences in the columns.
            else
            {
                // modify the table columns if is not equal to the Sencha Model
                foreach($tableColumns as $column)
                {
                    $change = 'false';
                    foreach($workingModelFields as $SenchaModel)
                    {
                        // if the field is found, start the comparison
                        if($SenchaModel['name'] == $column['Field'])
                        {
                            // the following code will check if there is a dataType property if not, take the type instead
                            // on the model and parse it too.
                            $modelDataType = (isset($SenchaModel['dataType']) ? $SenchaModel['dataType'] : $SenchaModel['type']);
                            if($modelDataType == 'string') $modelDataType = 'varchar';
                            if($modelDataType == 'bool' && $modelDataType == 'boolean') $modelDataType = 'tinyint';

                            // check for changes on the field type is a obligatory thing
                            if(strripos($column['Type'], $modelDataType) === false) $change = 'true'; // Type

                            // check if there changes on the allowNull property,
                            // but first check if it's used on the sencha model
                            if(isset($SenchaModel['allowNull']))
                                if( $column['Null'] == ($SenchaModel['allowNull'] ? 'YES' : 'NO') ) $change = 'true'; // NULL

                            // check the length of the field,
                            // but first check if it's used on the sencha model.
                            if(isset($SenchaModel['len']))
                                if($SenchaModel['len'] != filter_var($column['Type'], FILTER_SANITIZE_NUMBER_INT)) $change = 'true'; // Length

                            // check if the default value is changed on the model,
                            // but first check if it's used on the sencha model
                            if(isset($SenchaModel['defaultValue']))
                                if($column['Default'] != $SenchaModel['defaultValue']) $change = 'true'; // Default value

                            // check if the primary key is changed on the model,
                            // but first check if the primary key is used on the sencha model.
                            if(isset($SenchaModel['primaryKey']))
                                if($column['Key'] != ($SenchaModel['primaryKey'] ? 'PRI' : '') ) $change = 'true'; // Primary key

                            // check if the auto increment is changed on the model,
                            // but first check if the auto increment is used on the sencha model.
                            if(isset($SenchaModel['autoIncrement']))
                                if($column['Extra'] != ($SenchaModel['autoIncrement'] ? 'auto_increment' : '') ) $change = 'true'; // auto increment

                            // check if the comment is changed on the model,
                            // but first check if the comment is used on the sencha model.
                            if(isset($SenchaModel['comment']))
                                if($column['Comment'] != $SenchaModel['comment']) $change = 'true'; // Comment

                            // Modify the column on the database
                            if($change == 'true') self::__modifyColumn($SenchaModel);
                        }
                    }
                }
            }

            return true;
        }
        catch(PDOException $e)
        {
            MatchaErrorHandler::__errorProcess($e);
            return false;
        }
    }

    /**
     * __getSenchaModel($fileModel):
     * This method is used by SechaModel method to get all the table and column
     * information inside the Sencha Model .js file
     * It also tries to load the model from memory if does not exist parse the
     * model file and store it.
     */
    static public function __getSenchaModel($fileModel)
    {
        try
        {
            // Getting Sencha model as a namespace
            $jsSenchaModel = self::__getFileContent($fileModel);
            if(!$jsSenchaModel) throw new Exception("Error opening the Sencha model file.");
            // get the actual Sencha Model.
            preg_match('/Ext\.define\([a-zA-Z0-9\',. ]+(?P<extmodel>.+)\);/si', $jsSenchaModel, $match);
            $jsSenchaModel = $match['extmodel'];
            // clean comments and convert function
            $jsSenchaModel = preg_replace('%[\t\n\r ,]+(?:convert:)+.+?\}+|//[^\n\r]+%s','',$jsSenchaModel);
            // unnecessary Ext.define functions
            $jsSenchaModel = preg_replace('/(?P<spaces>[\t\n\r ])|(?P<sencha>[\d(),.:;A-Za-z{}]+?)|(?P<properties>\'[^\n\r\']+\')/', '$2$3', $jsSenchaModel);
            // add quotes to proxy Ext.Direct functions
            $jsSenchaModel = preg_replace("/(read|create|update|destroy)([:])((\w|\.)*)/", "$1$2'$3'", $jsSenchaModel);

            // wrap with double quotes to all the properties
            $jsSenchaModel = preg_replace('/(,|\{)(\w*):/', "$1\"$2\":", $jsSenchaModel);
            // wrap with double quotes float numbers
            $jsSenchaModel = preg_replace("/([0-9]+\.[0-9]+)/", "\"$1\"", $jsSenchaModel);
            // replace single quotes for double quotes
            // TODO: refine this to make sure doesn't replace apostrophes used in comments. example: don't
            $jsSenchaModel = preg_replace("(')", '"', $jsSenchaModel);

            $model = (array)json_decode($jsSenchaModel, true);
            if(!count($model)) throw new Exception("Something went wrong converting it to an array. Model('$fileModel'). JSON Error: " . self::__JSONErrorTranslate(json_last_error()));

            // check if there are a defined table from the model
            if(!isset($model['table'])) throw new Exception("Table property is not defined on Sencha Model. 'table:'");
            // check if there are a defined fields from the model
            if(!isset($model['fields'])) throw new Exception("Fields property is not defined on Sencha Model. 'fields:'");

            if(!MatchaMemory::__storeSenchaModel($fileModel, $model)) throw new Exception("Error storing sencha model into memory.");
            return $model;
        }
        catch(Exception $e)
        {
            MatchaErrorHandler::__errorProcess($e);
            return false;
        }
    }

    /**
     * function __JSONErrorTranslate($jsonError)
     * Method to translate the JSON last error into a human readable string.
     * @param $jsonError
     * @return string
     */
    static public function __JSONErrorTranslate($jsonError)
    {
        switch ($jsonError)
        {
            case JSON_ERROR_NONE:
                return ' - No errors';
                break;
            case JSON_ERROR_DEPTH:
                return ' - Maximum stack depth exceeded';
                break;
            case JSON_ERROR_STATE_MISMATCH:
                return ' - Underflow or the modes mismatch';
                break;
            case JSON_ERROR_CTRL_CHAR:
                return ' - Unexpected control character found';
                break;
            case JSON_ERROR_SYNTAX:
                return ' - Syntax error, malformed JSON';
                break;
            case JSON_ERROR_UTF8:
                return ' - Malformed UTF-8 characters, possibly incorrectly encoded';
                break;
            default:
                return ' - Unknown error';
                break;
        }
    }

    /**
     * function __getFileContent($file, $type = 'js'):
     * Load a Sencha Model from .js file
     */
    static protected function __getFileContent($file, $type = 'js')
    {
        try
        {
            $file = (string)str_replace('App.', '', $file);
            $file = str_replace('.', '/', $file);
            if(!@file_exists(self::$__app.'/'.$file.'.'.$type)) throw new Exception('Sencha file "'.self::$__app.'/'.$file.'.'.$type.'" not found.');
            return (string)@file_get_contents(self::$__app.'/'.$file.'.'.$type);
        }
        catch(Exception $e)
        {
            MatchaErrorHandler::__errorProcess($e);
            return false;
        }
    }

    /**
     * function __getFileModifyDate($file, $type = 'js'):
     * Method to get the last modified from a Sencha Model file.
     * @param $file
     * @param string $type
     * @return bool|int
     * @throws Exception
     */
    static function __getFileModifyDate($file, $type = 'js')
    {
        try
        {
            $file = (string)str_replace('App.', '', $file);
            $file = str_replace('.', '/', $file);
            if(!@file_exists(self::$__app.'/'.$file.'.'.$type)) throw new Exception('Sencha file "'.self::$__app.'/'.$file.'.'.$type.'" not found.');
            return filemtime(self::$__app.'/'.$file.'.'.$type);
        }
        catch(Exception $e)
        {
            MatchaErrorHandler::__errorProcess($e);
            return false;
        }
    }

    /**
     * function __setSenchaModelData($fileData):
     * Method to grab data and insert it into the table.
     * it uses MatchaThread to do batches of 500 records at the same
     * time.
     * TODO: Needs more work.
     */
    static public function __setSenchaModelData($fileData)
    {
        try
        {
            $dataArray = json_decode(self::__getFileContent($fileData, 'json'), true);
            if(!count($dataArray)) throw new Exception("Something went wrong converting it to an array, a bad lolo.");
            $table = (string)(is_array(self::$__senchaModel['table']) ? self::$__senchaModel['table']['name'] : self::$__senchaModel['table']);
            $columns = 'INSERT INTO `'.$table.'` (`'.implode('`,`', array_keys($dataArray[0]) ).'`) VALUES ';

            $rowCount = 0;
            $valuesEncapsulation = '';
            foreach($dataArray as $key => $data)
            {
                $values  = array_values($data);
                foreach($values as $index => $val) if($val == null) $values[$index] = 'NULL';
                $valuesEncapsulation  .= '(\''.implode('\',\'',$values).'\')';
                if( $rowCount == 500 || $key == end(array_keys($dataArray)))
                {
                    // check if Threads PHP Class exists if does not exist
                    // run the SQL in normal fashion
                    if(class_exists('MatchaThreads'))
                    {
                        $thread = new MatchaThreads();
                        $thread->sqlStatement = $columns.$valuesEncapsulation.';';
                        $thread->start();
                    }
                    else
                    {
                        Matcha::$__conn->query($columns.$valuesEncapsulation.';');
                    }
                    $valuesEncapsulation = '';
                    $rowCount = 0;
                }
                else
                {
                    $valuesEncapsulation .= ', ';
                    $rowCount++;
                }
            }
            return true;
        }
        catch(Exception $e)
        {
            MatchaErrorHandler::__errorProcess($e);
            return false;
        }
    }

    /**
     * function setSenchaModel($senchaModel = array()):
     * The first thing to do, to begin using Matcha
     * This will load the Sencha Model to Matcha and do it's magic.
     */
    static public function setSenchaModel($senchaModel = array())
    {
        try
        {
            if(self::__SenchaModel($senchaModel))
            {
                $MatchaCUP = new MatchaCUP;
                $MatchaCUP->setModel(self::$__senchaModel);
                return $MatchaCUP;
            }
        }
        catch(Exception $e)
        {
            MatchaErrorHandler::__errorProcess($e);
            return false;
        }
    }

    /**
     * function __createModelFile($fileSenchaModel, $databaseTable = NULL):
     * Method to create the Sencha Model .js file into the filesystem
     * @param $fileSenchaModel
     * @param null $databaseTable
     * @param array $columns
     * @throws Exception
     * @return bool
     */
    private function __createModelFile($fileSenchaModel, $databaseTable = NULL, $columns = array())
    {
        try
        {
            // compose the directory structure
            $dirLastKey = array_pop(explode('.', $fileSenchaModel));
            $modelDir = str_replace('.'.$dirLastKey, '', $fileSenchaModel);
            $modelDir = str_replace('App.', '', $modelDir);

            // check if the directory does not exist, if not create it.
            if(!@opendir( self::$__app.'/'.strtolower(str_replace('.', '/', $modelDir) ) ))
            {
                $result = @mkdir(self::$__app.'/'.strtolower(str_replace('.', '/', $modelDir) ), 0775, true );
                if( !$result ) throw new Exception('Could not create the directory.');
            }

            // compose the Sencha Model .js for the first time
            $jsSenchaModel = (string)'// Created dynamically by Matcha::connect';
            $jsSenchaModel .= '// Create date: '.date('Y-m-d H:i:s');
            $jsSenchaModel .= chr(13);
            $jsSenchaModel .= "Ext.define('".$fileSenchaModel."', {" . chr(13);
            $jsSenchaModel .= MatchaUtils::t(1)."extend: 'Ext.data.Model'," . chr(13);
            $jsSenchaModel .= MatchaUtils::t(1)."table: { name:'$databaseTable' },".chr(13);
            $jsSenchaModel .= MatchaUtils::t(1)."fields: [" . chr(13);
            $jsSenchaModel .= MatchaUtils::t(1)."{name: 'id', type: 'int', comment: 'Primary Key'},".chr(13);
            foreach($columns as $column)
            {
                $jsSenchaModel .= MatchaUtils::t(1)."{";
                foreach($column as $columnKey => $columnValue) $jsSenchaModel .= $columnKey.": '".$columnValue."',";
                $jsSenchaModel = substr($jsSenchaModel, 0, -1);
                $jsSenchaModel .= "},".chr(13);
            }
            $jsSenchaModel = substr($jsSenchaModel, 0, -2);
            $jsSenchaModel .= MatchaUtils::t(1)."]" . chr(13);
            $jsSenchaModel .= '});' . chr(13);

            // create the Sencha Model .js file for the first time
            $file = self::$__app.'/'.strtolower(str_replace('.', '/', $modelDir) ).'/'.$dirLastKey.'.js';
            if(!@file_put_contents($file, $jsSenchaModel)) throw new Exception('Could not create the Sencha Model file.');
            return true;
        }
        catch(Exception $e)
        {
            MatchaErrorHandler::__errorProcess($e);
            return false;
        }
    }

    /**
     * function matchaCreateModel($fileSenchaModel, $databaseTable = NULL, $column = array()):
     * Method to serve as a router, this will create the dynamic Sencha model.
     */
    public function matchaCreateModel($fileSenchaModel, $databaseTable = NULL, $columns = array())
    {
        // first create the Sencha Model file.
        if( self::__createModelFile($fileSenchaModel, $databaseTable, $columns) ) return false;

        // if the sencha model file was created successfully go ahead and create the database-table from
        // the sencha model file.
        if( self::__SenchaModel($fileSenchaModel) ) return false;

        // finally if all was a success return true.
        // If any errors the private functions called above will generate
        // the debug information needed.
        return true;
    }

    /**
     * function addFieldsToModel($senchaProperties = array()):
     * Method to add fields to the sencha model.
     * @param array $senchaProperties
     * @return bool
     */
    public static function addFieldsToModel($senchaProperties = array())
    {
        if(empty($senchaProperties)) return false;
        $tmpModel = self::__getSenchaModel($senchaProperties['model']);
        if(!$tmpModel) return false;
        // add the new fields to the Sencha Model
        array_push($tmpModel['fields'], $senchaProperties['field']);
        // re-create the Sencha Model file.
        if(!self::__arrayToSenchaModel($senchaProperties['model'], $tmpModel)) return false;
        // check the database table
        if(!self::__SenchaModel($senchaProperties['model'])) return false;
        return true;
    }

    /**
     * function removeFieldsFromModel($senchaProperties = array()):
     * Method to remove columns to the model
     * @param array $senchaProperties
     * @return bool
     */
    public static function removeFieldsFromModel($senchaProperties = array())
    {
        if(empty($senchaProperties)) return false;
        $tmpModel = self::__getSenchaModel($senchaProperties['model']);
        if(!$tmpModel) return false;
        // navigate through the fields of the $removeColumns
        // and remove the field.
        $foundKey = MatchaUtils::__recursiveArraySearch($senchaProperties['field'], $tmpModel['fields']);
        if($foundKey !== false) unset($tmpModel['fields'][$foundKey]);
        // re-create the Sencha Model file.
        if(!self::__arrayToSenchaModel($senchaProperties['model'], $tmpModel)) return false;
        // check the database table
        if(!self::__SenchaModel($senchaProperties['model'])) return false;
        return true;
    }

    /**
     * function modifyFieldsFromModel($senchaProperties = array()):
     * Method to modify field in the Sencha Model
     * @param array $senchaProperties
     * @return bool
     */
    public static function modifyFieldsFromModel($senchaProperties = array())
    {
        if(empty($senchaProperties)) return false;
        $tmpModel = self::__getSenchaModel($senchaProperties['model']);
        if(!$tmpModel) return false;
        // navigate through the fields of the $removeColumns
        // and remove the field and then re-insert the modified one
        $foundKey = MatchaUtils::__recursiveArraySearch($senchaProperties['field'], $tmpModel['fields']);
        if($foundKey !== false)
        {
            unset($tmpModel['fields'][$foundKey]);
            array_push($tmpModel['fields'], $senchaProperties['field']);
        }
        // re-create the Sencha Model file.
        if(!self::__arrayToSenchaModel($senchaProperties['model'], $tmpModel)) return false;
        // check the database table
        if(!self::__SenchaModel($senchaProperties['model'])) return false;
        return true;
    }

    /**
     * function __arrayToSenchaModel($fileSenchaModel, $senchaModelArray = array()):
     * Method to convert the array of the Sencha Model to a valid Sencha Model .js file
     * @param $fileSenchaModel
     * @param array $senchaModelArray
     * @return bool
     * @throws Exception
     */
    private static function __arrayToSenchaModel($fileSenchaModel, $senchaModelArray = array())
    {
        try
        {
            // compose the directory structure
	        $fileSenchaExploded = explode('.', $fileSenchaModel);
            $dirLastKey = array_pop($fileSenchaExploded);
            $modelDir = str_replace('.'.$dirLastKey, '', $fileSenchaModel);
            $modelDir = str_replace('App.', '', $modelDir);

            // compose the Sencha Model .js
            $jsSenchaModel = (string)'// Created dynamically by Matcha::connect'.chr(13);
            $jsSenchaModel .= '// Create date: '.date('Y-m-d H:i:s').chr(13);
            $jsSenchaModel .= chr(13);
            $jsSenchaModel .= "Ext.define('".$fileSenchaModel."',".chr(13);
            $jsSenchaModel .= preg_replace('/"(?P<key>.+?)":/', '$1:', json_encode($senchaModelArray, JSON_PRETTY_PRINT));
            $jsSenchaModel .= ');'.chr(13);
            $jsSenchaModel = str_replace('"', "'", $jsSenchaModel);
            $jsSenchaModel = preg_replace('/(?P<f>read)[\t :]+\'(?P<m>.+?)\'/i', "$1: $2", $jsSenchaModel);
            $jsSenchaModel = preg_replace('/(?P<f>create)[\t :]+\'(?P<m>.+?)\'/i', "$1: $2", $jsSenchaModel);
            $jsSenchaModel = preg_replace('/(?P<f>update)[\t :]+\'(?P<m>.+?)\'/i', "$1: $2", $jsSenchaModel);
            $jsSenchaModel = preg_replace('/(?P<f>destroy)[\t :]+\'(?P<m>.+?)\'/i', "$1: $2", $jsSenchaModel);

            // ro-do the Sencha Model .js file
            $file = self::$__app.'/'.strtolower(str_replace('.', '/', $modelDir) ).'/'.$dirLastKey.'.js';
            $fileObject = @fopen($file,'w+');
            if(!$fileObject) throw new Exception('Could not create or open the Sencha Model file.');
            if(!@fwrite($fileObject,$jsSenchaModel,strlen($jsSenchaModel))) throw new Exception('Could not write the Sencha Model file.');
            @fclose($fileObject);
            if(!@chmod($file,0775)) throw new Exception('Could not chmod the Sencha Model file.');
            return true;
        }
        catch(Exception $e)
        {
            MatchaErrorHandler::__errorProcess($e);
            return false;
        }
    }

    /**
     * function __createModelTable($fileSenchaModel, $databaseTable = NULL):
     * Method to create the model on the table.
     * @param $fileSenchaModel
     * @param null $databaseTable
     * @param array $fields
     * @return bool
     */
    private function __createModelTable($fileSenchaModel, $databaseTable = NULL, $fields = array())
    {
        try
        {
            $recordSet = self::$__conn->query("SHOW FULL COLUMNS IN ".$databaseTable.";");
            $tableColumns = $recordSet->fetchAll(PDO::FETCH_ASSOC);
            $fields = '';
            foreach($tableColumns as $column) $fields .= MatchaUtils::t(2).self::__renderSenchaFieldSyntax($column).chr(13);
        }
        catch(PDOException $e)
        {
            MatchaErrorHandler::__errorProcess($e);
            return false;
        }
    }

    /**
     * function __renderSenchaFieldSyntax($tableColumn):
     * Method to render and return the syntax for the Sencha Model fields
     */
    public function __renderSenchaFieldSyntax($tableColumn)
    {
        $SenchaField = '';
        switch( strtoupper(strstr($tableColumn['Type'], '(', true)) )
        {
            case 'BIT'; case 'TINYINT'; case 'SMALLINT'; case 'MEDIUMINT'; case 'INT'; case 'INTEGER'; case 'BIGINT':
                $SenchaType = 'int';
                break;
            case 'REAL'; case 'DOUBLE'; case 'FLOAT'; case 'DECIMAL'; case 'NUMERIC':
                $SenchaType = 'float';
                break;
            case 'DATE'; case 'TIME'; case 'TIMESTAMP'; case 'DATETIME'; case 'YEAR':
                $SenchaType = 'date';
                break;
            case 'CHAR'; case 'VARCHAR':
                $SenchaType = 'string';
                break;
        }
        $SenchaField .= MatchaUtils::t(1)."{name: '".$tableColumn['Field']."', type: '".$SenchaType."'},";
        return $SenchaField;
    }

	static public function __getFields($model)
    {
		$arr = array();
		$fields = (is_object($model)? MatchaUtils::__objectToArray($model->fields): $model['fields']);
		foreach($fields as $field)
		{
			$arr[] = $field['name'];
		}
		return $arr;
	}

	/**
	 * function __getFieldType($fieldName, $model):
     * Method to do a lookup in the model to look for the field type.
	 * @param $fieldName
	 * @param $model
	 * @return mixed
	 */
	static public function __getFieldType($fieldName, $model)
    {
		$fields = (is_object($model) ? MatchaUtils::__objectToArray($model->fields) : $model['fields']);
		$index = MatchaUtils::__recursiveArraySearch($fieldName, $fields);
		return $fields[$index]['type'];
	}

	/**
	 *
	 * @param $fields array || object of fields names example array('id','username','passwors')
	 * @param $model array || object of the model
	 * @return array
	 */
	static public function __getFieldsProperties($fields, $model){
		$arr = array();
		$fields = (is_object($fields)? MatchaUtils::__objectToArray($fields): $fields);
		$modelFields = (is_object($model)? MatchaUtils::__objectToArray($model->fields): $model['fields']);
		foreach($fields as $field)
        {
			$index = MatchaUtils::__recursiveArraySearch($field, $modelFields);
			if($index !== false) $arr[] = $modelFields[$index];
		}
		return $arr;
	}

	static public function __getPhantomFields($model){
		$arr = array();
		$fields = (is_object($model)? MatchaUtils::__objectToArray($model->fields): $model['fields']);
		foreach($fields as $field)
		{
			if(isset($field['store']) && !$field['store']) $arr[] = $field['name'];
		}
		$arr = (empty($arr) ? false : $arr);
		return $arr;
	}

	static public function __getArrayFields($model){
		$arr = array();
		$fields = (is_object($model)? MatchaUtils::__objectToArray($model->fields): $model['fields']);
		foreach($fields as $field)
		{
			if(isset($field['type']) && strtolower($field['type']) == 'array') $arr[] = $field['name'];
		}
		$arr = (empty($arr) ? false : $arr);
		return $arr;
	}

	/**
	 * @param $model
	 * @return array|bool
	 */
	static public function __getEncryptedFields($model){
		$arr = array();
		$fields = (is_object($model)? MatchaUtils::__objectToArray($model->fields): $model['fields']);
		foreach($fields as $field)
		{
			if(isset($field['encrypt']) && $field['encrypt']) $arr[] = $field['name'];
		}
		$arr = (empty($arr) ? false : $arr);
		return $arr;
	}

    /**
     * function __getTablePrimaryKey($table):
     * Method to get the primary key from the database-table
     * @param $table
     * @return mixed
     */
    static public function __getTablePrimaryKey($table)
    {
		$rec = self::$__conn->query("SHOW INDEX FROM $table");
		return $rec->fetch(PDO::FETCH_ASSOC);
	}

    /**
     * function __getTablePrimaryKeyColumnName($table):
     * Method to return the name of the primary key.
     * @param $table
     * @return mixed
     */
    static public function __getTablePrimaryKeyColumnName($table)
    {
		$rec = self::__getTablePrimaryKey($table);
		return $rec['Column_name'];
	}

    /**
     * function __createAllTriggers($senchaModel, $table):
     * Method to create the triggers from sencha model
     */
    static private function __createAllTriggers($senchaModel, $table)
    {
        try
        {
            if(!isset($senchaModel['triggers'])) return true;
            foreach($senchaModel['triggers'] as $trigger) self::__createTrigger($table, $trigger);
            return true;
        }
        catch(PDOException $e)
        {
            MatchaErrorHandler::__errorProcess($e);
            return false;
        }
    }

    /**
     * function __createTriggers($senchaModel, $table):
     * Method to create the triggers from sencha model
     */
    static private function __createTrigger($table, $trigger)
    {
        try
        {
            $insert = 'DELIMITER $$ '.chr(13);
            $insert .= 'CREATE TRIGGER '.$trigger['name'].' '.$trigger['time'].' '.$trigger['event'].' ON '.$table. ' '.$trigger['definition'].'; $$ '.chr(13);
            $insert .= 'DELIMITER ;'.chr(13);
            self::$__conn->query($insert);
            return true;
        }
        catch(PDOException $e)
        {
            MatchaErrorHandler::__errorProcess($e);
            return false;
        }
    }

    /**
     * function __destroyTrigger($table, $triggerName):
     * Method will drop a trigger in a given table and trigger name.
     * @param $table
     * @param $triggerName
     * @return bool
     */
    static private function __destroyTrigger($table, $triggerName)
    {
        try
        {
            $dropTrigger = 'DROP TRIGGER IF EXISTS '.$table.'.'.$triggerName.';'.chr(13);
            self::$__conn->query($dropTrigger);
            return true;
        }
        catch(PDOException $e)
        {
            MatchaErrorHandler::__errorProcess($e);
            return false;
        }
    }

    /**
     * function __diffTriggers($senchaModel):
     * Method to make changes on the trigger, if the trigger is different
     * @param $senchaModel
     * @return bool
     */
    static private function __diffTriggers($senchaModel)
    {
        try
        {
            if(empty($senchaModel['triggers'])) return false;

            $databaseTriggers = self::$__conn->query("SHOW TRIGGERS LIKE '".$senchaModel['table']['name']."';");
            // get all the triggers names of each model (Sencha and Database-table)
            $tableTrigger = array();
            $senchaTrigger = array();
            foreach($databaseTriggers as $trigger) $tableTrigger[] = $trigger['Trigger'];
            foreach($senchaModel['triggers'] as $trigger) $senchaTrigger[] = $trigger['name'];

            // get all the triggers that are not present in the database-table and sencha model
            $differentCreateTrigger = array_diff($senchaTrigger, $tableTrigger);
            $differentDropTrigger = array_diff($tableTrigger, $senchaTrigger);

            if( count($tableTrigger) <= 1 )
            {
                self::__createAllTriggers($senchaModel, $senchaModel['table']['name']);
                return true;
            }
            elseif( count($differentCreateTrigger) || count($differentDropTrigger) )
            {
                foreach($differentCreateTrigger as $trigger) self::__createTrigger($senchaModel['table']['name'], $trigger);
                foreach($differentDropTrigger as $trigger) self::__destroyTrigger( $senchaModel['table']['name'], $trigger['Trigger'] );
            }
            else
            {
                foreach($senchaModel['triggers'] as $senchaTrigger)
                {
                    $change = false;
                    foreach($databaseTriggers as $databaseTrigger)
                    {
                        if(strtolower($databaseTrigger['Trigger']) == strtolower($senchaTrigger['name']))
                        {
                            if(strtolower($databaseTrigger['Event']) != strtolower($senchaTrigger['event'])) $change = true;
                            if(strtolower($databaseTrigger['Timing']) != strtolower($senchaTrigger['time'])) $change = true;
                            if(strtolower($databaseTrigger['Statement']) != strtolower($senchaTrigger['definition'])) $change = true;
                            if($change)
                            {
                                self::__destroyTrigger( $senchaModel['table']['name'], $databaseTrigger['Trigger'] );
                                self::__createTrigger($senchaModel['table']['name'], $senchaTrigger);
                            }
                        }
                    }
                }
            }
            return true;
        }
        catch(PDOException $e)
        {
            MatchaErrorHandler::__errorProcess($e);
            return false;
        }
    }

}