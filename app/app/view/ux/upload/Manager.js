/**
 * The object is responsible for uploading the queue.
 * 
 */
Ext.define('Ext.ux.upload.Manager', {
    mixins : {
        observable : 'Ext.util.Observable'
    },

    requires : [
        'Ext.ux.upload.uploader.AbstractUploader'
    ],

    config : {
        uploader : null,
        uploaderOptions : null,
        synchronous : true
    },

    DEFAULT_UPLOADER_CLASS : 'Ext.ux.upload.uploader.ExtJsUploader',

    constructor : function(config) {
        this.mixins.observable.constructor.call(this);

        this.addEvents({
            'beforeupload' : true,

            /**
             * @event
             * 
             * Fired when the upload completes.
             * 
             * @param {Ext.ux.upload.Manager} manager
             * @param {Ext.ux.upload.Queue} queue
             * @param {number} errorCount 
             */
            'uploadcomplete' : true,

            /**
             * @event
             * 
             * Fired after the upload has been aborted.
             * 
             * @param {Ext.ux.upload.Manager} manager
             * @param {Ext.ux.upload.Queue} queue
             */
            'abortupload' : true,

            /**
             * @event
             * 
             * Fired after a single item has been uploaded successfully.
             * 
             * @param {Ext.ux.upload.Manager} manager
             * @param {Ext.ux.upload.Item} item
             * @param {Object} info
             */
            'itemuploadsuccess' : true,

            /**
            * @event
            * 
            * Fired after an error has occurred while uploading an item.
            * 
            * @param {Ext.ux.upload.Manager} manager
            * @param {Ext.ux.upload.Item} item
            * @param {Object} info
            */
            'itemuploadfailure' : true
        });

        this.initConfig(config);

        if (!(this.uploader instanceof Ext.ux.upload.uploader.AbstractUploader)) {
            var uploaderClass = this.DEFAULT_UPLOADER_CLASS;
            if (Ext.isString(this.uploader)) {
                uploaderClass = this.uploader;
            }

            var uploaderOptions = this.getUploaderOptions() || {};
            Ext.applyIf(uploaderOptions, {
                success : this.onUploadSuccess,
                failure : this.onUploadFailure,
                progress : this.onUploadProgress
            });

            this.uploader = Ext.create(uploaderClass, uploaderOptions);
        }

        this.mon(this.uploader, 'uploadsuccess', this.onUploadSuccess, this);
        this.mon(this.uploader, 'uploadfailure', this.onUploadFailure, this);
        this.mon(this.uploader, 'uploadprogress', this.onUploadProgress, this);

        Ext.apply(this, {
            syncQueue : null,
            currentQueue : null,
            uploadActive : false,
            errorCount : 0
        });
    },

    uploadQueue : function(queue) {
        if (this.uploadActive) {
            return;
        }

        this.startUpload(queue);

        queue.reset();

        if (this.synchronous) {
            this.uploadQueueSync(queue);
            return;
        }

        this.uploadQueueAsync(queue);

    },

    uploadQueueSync : function(queue) {
        this.uploadNextItemSync();
    },

    uploadNextItemSync : function() {
        if (!this.uploadActive) {
            return;
        }

        var item = this.currentQueue.getFirstReadyItem();
        if (!item) {
            return;
        }

        this.uploader.uploadItem(item);
    },

    uploadQueueAsync : function(queue) {
        var i;
        var num = queue.getCount();

        for (i = 0; i < num; i++) {
            this.uploader.uploadItem(queue.getAt(i));
        }
    },

    startUpload : function(queue) {
        this.uploadActive = true;
        this.currentQueue = queue;
        this.fireEvent('beforeupload', this, queue);
    },

    finishUpload : function() {
        this.fireEvent('uploadcomplete', this, this.currentQueue, this.errorCount);
    },

    resetUpload : function() {
        this.currentQueue = null;
        this.uploadActive = false;
        this.errorCount = 0;
    },

    abortUpload : function() {
        this.uploader.abortUpload();
        this.currentQueue.recoverAfterAbort();
        this.resetUpload();

        this.fireEvent('abortupload', this, this.currentQueue);
    },

    afterItemUpload : function(item, info) {
        if (this.synchronous) {
            this.uploadNextItemSync();
        }

        if (this.currentQueue.isLast(item)) {
            this.finishUpload();
        }
    },

    onUploadSuccess : function(item, info) {
        item.setUploaded();

        this.fireEvent('itemuploadsuccess', this, item, info);

        this.afterItemUpload(item, info);
    },

    onUploadFailure : function(item, info) {
        item.setUploadError(info.message);

        this.fireEvent('itemuploadfailure', this, item, info);
        this.errorCount++;

        this.afterItemUpload(item, info);
    },

    onUploadProgress : function(item, event) {
        item.setProgress(event.loaded);
    }
});
