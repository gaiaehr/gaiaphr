/*!
 * Extensible 1.6.0-b1
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
/**
 * Bulgarian Translation
 *
 * By Георги Ко�?тадинов, Калгари, Канада
 * 10 October 2007
 * By Nedko Penev 
 * 26 October 2007
 *
 * (utf-8 encoding)
 */
Ext.onReady(function() {
    var cm = Ext.ClassManager, 
        exists = Ext.Function.bind(cm.get, cm);

    if (Ext.Updater) {
        Ext.Updater.defaults.indicatorText = '<div class="loading-indicator">Зареждане...</div>';
    }
    if(exists('Ext.view.View')){
      Ext.view.View.prototype.emptyText = "";
    }

    if(exists('Ext.grid.Panel')){
      Ext.grid.Panel.prototype.ddText = "{0} избрани колони";
    }

    if(Ext.TabPanelItem){
      Ext.TabPanelItem.prototype.closeText = "Затвори таб";
    }

    if(exists('Ext.form.field.Base')){
      Ext.form.field.Base.prototype.invalidText = "�?евалидна �?тойно�?т на полето";
    }

    if(Ext.LoadMask){
      Ext.LoadMask.prototype.msg = "Зареждане...";
    }

    if(Ext.Date) {
        Ext.Date.monthNames = [
          "Януари",
          "Февруари",
          "Март",
          "�?прил",
          "Май",
          "Юни",
          "Юли",
          "�?вгу�?т",
          "Септември",
          "Октомври",
          "�?оември",
          "Декември"
        ];

        Ext.Date.monthNumbers = {
          Jan : 0,
          Feb : 1,
          Mar : 2,
          Apr : 3,
          May : 4,
          Jun : 5,
          Jul : 6,
          Aug : 7,
          Sep : 8,
          Oct : 9,
          Nov : 10,
          Dec : 11
        };

        Ext.Date.dayNames = [
          "�?едел�?",
          "Понеделник",
          "Вторник",
          "Ср�?да",
          "Четвъртък",
          "Петък",
          "Събота"
        ];
    }
    if(Ext.MessageBox){
      Ext.MessageBox.buttonText = {
        ok     : "OK",
        cancel : "Отмени",
        yes    : "Да",
        no     : "�?е"
      };
    }

    if(exists('Ext.util.Format')){
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u043b\u0432',  // Bulgarian Leva
            dateFormat: 'd.m.Y'
        });
    }

    if(exists('Ext.picker.Date')){
      Ext.apply(Ext.picker.Date.prototype, {
        todayText         : "Дне�?",
        minText           : "Тази дата е преди минималната",
        maxText           : "Тази дата е �?лед мак�?ималната",
        disabledDaysText  : "",
        disabledDatesText : "",
        monthNames        : Ext.Date.monthNames,
        dayNames          : Ext.Date.dayNames,
        nextText          : 'Следващ ме�?ец (Control+Right)',
        prevText          : 'Предишен ме�?ец (Control+Left)',
        monthYearText     : 'Избери ме�?ец (Control+Up/Down за преме�?тване по години)',
        todayTip          : "{0} (Spacebar)",
        format            : "d.m.y",
        startDay          : 1
      });
    }

    if(exists('Ext.picker.Month')) {
      Ext.apply(Ext.picker.Month.prototype, {
          okText            : "&#160;OK&#160;",
          cancelText        : "Отмени"
      });
    }

    if(exists('Ext.toolbar.Paging')){
      Ext.apply(Ext.PagingToolbar.prototype, {
        beforePageText : "Страница",
        afterPageText  : "от {0}",
        firstText      : "Първа �?траница",
        prevText       : "Предишна �?траница",
        nextText       : "Следваща �?траница",
        lastText       : "По�?ледна �?траница",
        refreshText    : "Презареди",
        displayMsg     : "Показвайки {0} - {1} от {2}",
        emptyMsg       : '�?�?ма данни за показване'
      });
    }

    if(exists('Ext.form.field.Text')){
      Ext.apply(Ext.form.field.Text.prototype, {
        minLengthText : "Минималната дължина на това поле е {0}",
        maxLengthText : "Мак�?ималната дължина на това поле е {0}",
        blankText     : "Това поле е задължително",
        regexText     : "",
        emptyText     : null
      });
    }

    if(exists('Ext.form.field.Number')){
      Ext.apply(Ext.form.field.Number.prototype, {
        minText : "Минималната �?тойно�?т за това поле е {0}",
        maxText : "Мак�?ималната �?тойно�?т за това поле е {0}",
        nanText : "{0} не е валидно чи�?ло"
      });
    }

    if(exists('Ext.form.field.Date')){
      Ext.apply(Ext.form.field.Date.prototype, {
        disabledDaysText  : "�?едо�?тъпен",
        disabledDatesText : "�?едо�?тъпен",
        minText           : "Датата в това поле тр�?бва да е �?лед {0}",
        maxText           : "Датата в това поле тр�?бва да е преди {0}",
        invalidText       : "{0} не е валидна дата - тр�?бва да бъде във формат {1}",
        format            : "d.m.y",
        altFormats        : "d.m.y|d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
      });
    }

    if(exists('Ext.form.field.ComboBox')){
      Ext.apply(Ext.form.field.ComboBox.prototype, {
        valueNotFoundText : undefined
      });
        Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
            loadingText       : "Зареждане..."
        });
    }

    if(exists('Ext.form.field.VTypes')){
      Ext.apply(Ext.form.field.VTypes, {
        emailText    : 'Това поле тр�?бва да бъде емейл във формат "user@example.com"',
        urlText      : 'Това поле тр�?бва да бъде URL във формат "http:/'+'/www.example.com"',
        alphaText    : 'Това поле тр�?бва да �?ъдържа �?амо букви и _',
        alphanumText : 'Това поле тр�?бва да �?ъдържа �?амо букви, цифри и _'
      });
    }

    if(exists('Ext.form.field.HtmlEditor')){
      Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        createLinkText : 'Мол�?, въведете URL за връзката:',
        buttonTips : {
          bold : {
            title: 'Bold (Ctrl+B)',
            text: 'Удебел�?ва избрани�? тек�?т.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          italic : {
            title: 'Italic (Ctrl+I)',
            text: 'Прави избрани�? тек�?т кур�?ив.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          underline : {
            title: 'Underline (Ctrl+U)',
            text: 'Подчертава избрани�? тек�?т.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          increasefontsize : {
            title: 'Уголеми тек�?та',
            text: 'Уголем�?ва размера на шрифта.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          decreasefontsize : {
            title: '�?амали тек�?та',
            text: '�?амал�?ва размера на шрифта.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          backcolor : {
            title: 'Цв�?т на маркирани�? тек�?т',
            text: 'Промен�? фонови�? цв�?т на избрани�? тек�?т.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          forecolor : {
            title: 'Цв�?т на шрифта',
            text: 'Промен�? цвета на избрани�? тек�?т.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          justifyleft : {
            title: 'Л�?во подравн�?ване',
            text: 'Подравн�?ва тек�?та на л�?во.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          justifycenter : {
            title: 'Центриране',
            text: 'Центрира тек�?та.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          justifyright : {
            title: 'Д�?�?но подравн�?ване',
            text: 'Подравн�?ва тек�?та на д�?�?но.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          insertunorderedlist : {
            title: '�?еномериран �?пи�?ък',
            text: 'Започва неномериран �?пи�?ък.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          insertorderedlist : {
            title: '�?омериран �?пи�?ък',
            text: 'Започва номериран �?пи�?ък.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          createlink : {
            title: 'Хипервръзка',
            text: 'Превръща избрани�? тек�?т в хипервръзка.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          sourceedit : {
            title: 'Редактиране на кода',
            text: 'Преминаване в режим на редактиране на кода.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          }
        }
      });
    }

    if(exists('Ext.grid.header.Container')){
      Ext.apply(Ext.grid.header.Container.prototype, {
        sortAscText  : "Подреди в нара�?тващ ред",
        sortDescText : "Подреди в намал�?ващ ред",
        lockText     : "Заключи колона",
        unlockText   : "Отключи колона",
        columnsText  : "Колони"
      });
    }

    if(exists('Ext.grid.PropertyColumnModel')){
      Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
        nameText   : "Име",
        valueText  : "Стойно�?т",
        dateFormat : "d.m.Y"
      });
    }


});