/**
 * GaiaPHR (Patient Health Records)
 * Copyright (C) 2013 Certun, inc.
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

Ext.define('App.controller.WebCam', {
    extend: 'App.controller.Abstract',

	refs: [
        {
            ref:'webCamWindow',
            selector:'webcamwindow'
        },
        {
            ref:'webCamCameras',
            selector:'combobox[action=webCamCameras]'
        },
        {
            ref:'photoIdImage',
            selector:'image[action=photoIdImage]'
        }
	],

	init: function() {
		var me = this;

        me.control({
            'webcamwindow':{
                render:me.onWebCamWindowRender
            },
            'image':{
                render:me.onImageRender
            },
            'combobox[action=webCamCameras]':{
                select:me.onWebCamCamerasSelect
            },
            'button[action=onWebCam]':{
                click:me.onWebCamClick
            },
            'button[action=onCaptureImage]':{
                click:me.onCaptureImageClick
            }
        })
	},

    onImageRender:function(img){
        img.el.on('click', function(e,el){
            Ext.widget('window',{
                html:'<img src="' + img.src + '">'
            }).show();
        });
    },

    onWebCamCamerasSelect:function(cmb, records){
        $.scriptcam.changeCamera(records[0].data.value);
    },

    onWebCamClick:function(btn){
        var action = btn.up('panel').down('image').action,
            win = Ext.widget('webcamwindow',{
                action:action
            });

        win.down('container').setSize({
            width: action == 'photoIdImage' ? 320 : 640,
            height: action == 'photoIdImage' ? 320 : 360
        });

        win.show();
    },

    onWebCamWindowRender:function(win){
        var me = this;
        Ext.Function.defer(function(){
            $("#WebCamCanvas").scriptcam({
                showMicrophoneErrors:false,
                onError:me.onError,
                cornerRadius:0,
                width: win.action == 'photoIdImage' ? 320 : 640,
                height: win.action == 'photoIdImage' ? 320 : 360,
                onWebcamReady:function (cameraNames,camera,microphoneNames,microphone,volume){
                    me.onWebcamReady(cameraNames,camera,me);
                },
                onPictureAsBase64:function(b64){
                    me.base64_tofield_and_image(b64);
                },
                path:'lib/ScriptCam/',
                uploadImage:'resources/images/upload.png'
            });
        }, 200);

    },

    onCaptureImageClick:function(){
        var me = this,
            win =  me.getWebCamWindow(),
            imgCmp = Ext.ComponentQuery.query('image[action=' + win.action + ']')[0],
            field = Ext.ComponentQuery.query('textareafield[action=' + win.action + ']')[0],
            src = 'data:image/jpg;base64,' + $.scriptcam.getFrameAsBase64();

        imgCmp.setSrc(src);
        field.setValue(src);
        win.close();
    },

    base64_tofield_and_image: function (b64) {
        var me = this,
            win =  me.getWebCamWindow(),
            imgCmp = Ext.ComponentQuery.query('image[action=' + win.action + ']')[0],
            field = Ext.ComponentQuery.query('textareafield[action=' + win.action + ']')[0],
            src = 'data:image/jpg;base64,' + b64;

        imgCmp.setSrc(src);
        field.setValue(src);
        win.close();
    },

    changeCamera: function () {
        $.scriptcam.changeCamera($('#cameraNames').val());
    },

    onError: function onError(errorId,errorMsg) {
        $( "#btn1" ).attr( "disabled", true );
        $( "#btn2" ).attr( "disabled", true );
        alert(errorMsg);
    },

    onWebcamReady:function (cameraNames,camera,me) {
        var store = me.getWebCamCameras().store,
            data = [];
        $.each(cameraNames, function(index, text) {
            data.push({
                option:text,
                value:index
            });
        });
        store.loadData(data);
        me.getWebCamCameras().setValue(camera);
    }
});