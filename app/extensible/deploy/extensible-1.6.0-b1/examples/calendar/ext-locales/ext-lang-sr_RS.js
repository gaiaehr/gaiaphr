/*!
 * Extensible 1.6.0-b1
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
﻿/**
 * Serbian Cyrillic Translation
 * by Čolovic Vladan (cyrillic, utf8 encoding)
 * sr_RS (ex: sr_CS, sr_YU)
 * 12 May 2007
 */
Ext.onReady(function() {
    var cm = Ext.ClassManager, 
        exists = Ext.Function.bind(cm.get, cm);

    if(Ext.Updater) {
        Ext.Updater.defaults.indicatorText = '<div class="loading-indicator">Учитавам...</div>';
    }

    if(exists('Ext.view.View')){
       Ext.view.View.prototype.emptyText = "";
    }

    if(exists('Ext.grid.Panel')){
       Ext.grid.Panel.prototype.ddText = "{0} изабраних редова";
    }

    if(Ext.TabPanelItem){
       Ext.TabPanelItem.prototype.closeText = "Затвори ову »картицу«";
    }

    if(exists('Ext.form.field.Base')){
       Ext.form.field.Base.prototype.invalidText = "Унешена вредно�?т није правилна";
    }

    if(Ext.LoadMask){
        Ext.LoadMask.prototype.msg = "Учитавам...";
    }

    if(Ext.Date) {
        Ext.Date.monthNames = [
           "Јануар",
           "Фебруар",
           "Март",
           "�?прил",
           "Мај",
           "Јун",
           "Јул",
           "�?вгу�?т",
           "Септембар",
           "Октобар",
           "�?овембар",
           "Децембар"
        ];

        Ext.Date.dayNames = [
           "�?едеља",
           "Понедељак",
           "Уторак",
           "Среда",
           "Четвртак",
           "Петак",
           "Субота"
        ];
    }

    if(Ext.MessageBox){
       Ext.MessageBox.buttonText = {
          ok     : "У реду",
          cancel : "Оду�?тани",
          yes    : "Да",
          no     : "�?е"
       };
    }

    if(exists('Ext.util.Format')){
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u0414\u0438\u043d\u002e',  // Serbian Dinar
            dateFormat: 'd.m.Y'
        });
    }

    if(exists('Ext.picker.Date')){
       Ext.apply(Ext.picker.Date.prototype, {
          todayText         : "Дана�?",
          minText           : "Датум је и�?пред најмањег дозвољеног датума",
          maxText           : "Датум је након највећег дозвољеног датума",
          disabledDaysText  : "",
          disabledDatesText : "",
          monthNames	: Ext.Date.monthNames,
          dayNames		: Ext.Date.dayNames,
          nextText          : 'Следећи ме�?ец (Control+Де�?но)',
          prevText          : 'Претходни ме�?ец (Control+Лево)',
          monthYearText     : 'Изаберите ме�?ец (Control+Горе/Доле за избор године)',
          todayTip          : "{0} (Размакница)",
          format            : "d.m.y",
          startDay 		 : 1
       });
    }

    if(exists('Ext.toolbar.Paging')){
       Ext.apply(Ext.PagingToolbar.prototype, {
          beforePageText : "Страна",
          afterPageText  : "од {0}",
          firstText      : "Прва �?трана",
          prevText       : "Претходна �?трана",
          nextText       : "Следећа �?трана",
          lastText       : "По�?ледња �?трана",
          refreshText    : "О�?вежи",
          displayMsg     : "Приказана {0} - {1} од {2}",
          emptyMsg       : '�?емам шта приказати'
       });
    }

    if(exists('Ext.form.field.Text')){
       Ext.apply(Ext.form.field.Text.prototype, {
          minLengthText : "Минимална дужина овог поља је {0}",
          maxLengthText : "Мак�?имална дужина овог поља је {0}",
          blankText     : "Поље је обавезно",
          regexText     : "",
          emptyText     : null
       });
    }

    if(exists('Ext.form.field.Number')){
       Ext.apply(Ext.form.field.Number.prototype, {
          minText : "Минимална вредно�?т у пољу је {0}",
          maxText : "Мак�?имална вредно�?т у пољу је {0}",
          nanText : "{0} није правилан број"
       });
    }

    if(exists('Ext.form.field.Date')){
       Ext.apply(Ext.form.field.Date.prototype, {
          disabledDaysText  : "Па�?ивно",
          disabledDatesText : "Па�?ивно",
          minText           : "Датум у овом пољу мора бити након {0}",
          maxText           : "Датум у овом пољу мора бити пре {0}",
          invalidText       : "{0} није правилан датум - захтевани облик је {1}",
          format            : "d.m.y"
       });
    }

    if(exists('Ext.form.field.ComboBox')){
       Ext.apply(Ext.form.field.ComboBox.prototype, {
          valueNotFoundText : undefined
       });
        Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
            loadingText       : "Учитавам..."
        });
    }

    if(exists('Ext.form.field.VTypes')){
       Ext.apply(Ext.form.field.VTypes, {
          emailText    : 'Ово поље прихвата e-mail адре�?у и�?кључиво у облику "korisnik@domen.com"',
          urlText      : 'Ово поље прихвата URL адре�?у и�?кључиво у облику "http:/'+'/www.domen.com"',
          alphaText    : 'Ово поље може �?адржати и�?кључиво �?лова и знак _',
          alphanumText : 'Ово поље може �?адржати �?амо �?лова, бројеве и знак _'
       });
    }

    if(exists('Ext.grid.header.Container')){
       Ext.apply(Ext.grid.header.Container.prototype, {
          sortAscText  : "Ра�?тући редо�?лед",
          sortDescText : "Опадајући редо�?лед",
          lockText     : "Закључај колону",
          unlockText   : "Откључај колону",
          columnsText  : "Колоне"
       });
    }

    if(exists('Ext.grid.PropertyColumnModel')){
       Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
          nameText   : "�?азив",
          valueText  : "Вредно�?т",
          dateFormat : "d.m.Y"
       });
    }

});