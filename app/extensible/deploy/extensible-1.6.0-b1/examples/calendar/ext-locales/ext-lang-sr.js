/*!
 * Extensible 1.6.0-b1
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
/**
 * Serbian Latin Translation
 * by Atila Hajnal (latin, utf8 encoding)
 * sr
 * 14 Sep 2007
 */
Ext.onReady(function() {
    var cm = Ext.ClassManager, 
        exists = Ext.Function.bind(cm.get, cm);

    if(Ext.Updater) {
        Ext.Updater.defaults.indicatorText = '<div class="loading-indicator">U�?itavam...</div>';
    }

    if(exists('Ext.view.View')){
       Ext.view.View.prototype.emptyText = "Ne postoji ni jedan slog";
    }

    if(exists('Ext.grid.Panel')){
       Ext.grid.Panel.prototype.ddText = "{0} izabranih redova";
    }

    if(Ext.TabPanelItem){
       Ext.TabPanelItem.prototype.closeText = "Zatvori оvu »karticu«";
    }

    if(exists('Ext.form.field.Base')){
       Ext.form.field.Base.prototype.invalidText = "Unešena vrednost nije pravilna";
    }

    if(Ext.LoadMask){
        Ext.LoadMask.prototype.msg = "U�?itavam...";
    }

    if(Ext.Date) {
        Ext.Date.monthNames = [
           "Januar",
           "Februar",
           "Mart",
           "April",
           "Мај",
           "Jun",
           "Јul",
           "Avgust",
           "Septembar",
           "Oktobar",
           "Novembar",
           "Decembar"
        ];

        Ext.Date.dayNames = [
           "Nedelja",
           "Ponedeljak",
           "Utorak",
           "Sreda",
           "Četvrtak",
           "Petak",
           "Subota"
        ];
    }

    if(Ext.MessageBox){
       Ext.MessageBox.buttonText = {
          ok     : "U redu",
          cancel : "Odustani",
          yes    : "Da",
          no     : "Ne"
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
          todayText         : "Danas",
          minText           : "Datum је ispred najmanjeg dozvoljenog datuma",
          maxText           : "Datum је nakon najvećeg dozvoljenog datuma",
          disabledDaysText  : "",
          disabledDatesText : "",
          monthNames	: Ext.Date.monthNames,
          dayNames		: Ext.Date.dayNames,
          nextText          : 'Sledeći mesec (Control+Desno)',
          prevText          : 'Prethodni mesec (Control+Levo)',
          monthYearText     : 'Izaberite mesec (Control+Gore/Dole za izbor godine)',
          todayTip          : "{0} (Razmaknica)",
          format            : "d.m.y",
          startDay 		 : 1
       });
    }

    if(exists('Ext.toolbar.Paging')){
       Ext.apply(Ext.PagingToolbar.prototype, {
          beforePageText : "Strana",
          afterPageText  : "od {0}",
          firstText      : "Prva strana",
          prevText       : "Prethodna strana",
          nextText       : "Sledeća strana",
          lastText       : "Poslednja strana",
          refreshText    : "Osveži",
          displayMsg     : "Prikazana {0} - {1} od {2}",
          emptyMsg       : 'Nemam šta prikazati'
       });
    }

    if(exists('Ext.form.field.Text')){
       Ext.apply(Ext.form.field.Text.prototype, {
          minLengthText : "Minimalna dužina ovog polja је {0}",
          maxLengthText : "Maksimalna dužina ovog polja је {0}",
          blankText     : "Polje је obavezno",
          regexText     : "",
          emptyText     : null
       });
    }

    if(exists('Ext.form.field.Number')){
       Ext.apply(Ext.form.field.Number.prototype, {
          minText : "Minimalna vrednost u polju је {0}",
          maxText : "Maksimalna vrednost u polju је {0}",
          nanText : "{0} nije pravilan broj"
       });
    }

    if(exists('Ext.form.field.Date')){
       Ext.apply(Ext.form.field.Date.prototype, {
          disabledDaysText  : "Pasivno",
          disabledDatesText : "Pasivno",
          minText           : "Datum u ovom polju mora biti nakon {0}",
          maxText           : "Datum u ovom polju mora biti pre {0}",
          invalidText       : "{0} nije pravilan datum - zahtevani oblik je {1}",
          format            : "d.m.y",
          altFormats        : "d.m.y|d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
       });
    }

    if(exists('Ext.form.field.ComboBox')){
       Ext.apply(Ext.form.field.ComboBox.prototype, {
          valueNotFoundText : undefined
       });
        Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
            loadingText       : "U�?itavam..."
        });
    }

    if(exists('Ext.form.field.VTypes')){
       Ext.apply(Ext.form.field.VTypes, {
          emailText    : 'Ovo polje prihavata e-mail adresu isklju�?ivo u obliku "korisnik@domen.com"',
          urlText      : 'Ovo polje prihavata URL adresu isklju�?ivo u obliku "http:/'+'/www.domen.com"',
          alphaText    : 'Ovo polje može sadržati isklju�?ivo slova i znak _',
          alphanumText : 'Ovo polje može sadržati �?амо slova, brojeve i znak _'
       });
    }

    if(exists('Ext.grid.header.Container')){
       Ext.apply(Ext.grid.header.Container.prototype, {
          sortAscText  : "Rastući redosled",
          sortDescText : "Opadajući redosled",
          lockText     : "Zaklju�?aj kolonu",
          unlockText   : "Otklju�?aj kolonu",
          columnsText  : "Kolone"
       });
    }

    if(exists('Ext.grid.PropertyColumnModel')){
       Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
          nameText   : "Naziv",
          valueText  : "Vrednost",
          dateFormat : "d.m.Y"
       });
    }

});