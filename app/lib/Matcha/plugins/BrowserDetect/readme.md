_This is not my code, but rather a Github repo of Chris Schuld's code so people can use it as a submodule in their Git projects. To download the original code please visit [Chris Schuld's page](http://chrisschuld.com/projects/browser-php-detecting-a-users-browser-from-php/)._

# Browser.php - Detecting a user's browser from PHP

Detecting the user’s browser type and version is helpful in web applications that harness some of the newer bleeding edge concepts. With the browser type and version you can notify users about challenges they may experience and suggest they upgrade before using such application. Not a great idea on a large scale public site; but on a private application this type of check can be helpful.

In an active project of mine we have a pretty graphically intensive and visually appealing user interface which leverages a lot of transparent PNG files. Because we all know how great [IE6 supports PNG](http://support.microsoft.com/kb/294714) files it was necessary for us to tell our users the lack of power their browser has in a kind way.

Searching for a way to do this at the PHP layer and not at the client layer was more of a challenge than I would have guessed; the only script available was written by [Gary White](http://apptools.com/phptools/browser/) and Gary no longer maintains this script because of reliability. I do agree 100% with Gary about the readability; however, there are realistic reasons to desire the user’s browser and browser version and if your visitor is not echoing a false user agent we can take an educated guess.

### Typical Usage:

```php
$browser = new Browser();
if( $browser->getBrowser() == Browser::BROWSER_FIREFOX && $browser->getVersion() >= 2 ) {
	echo 'You have FireFox version 2 or greater';
}
```

### I based this solution off of Gary White’s original solution but added a few things:

* I added the ability to view the return values as class constants to increase the readability
* Updated the version detection for Amaya
* Updated the version detection for Firefox
* Updated the version detection for Lynx
* Updated the version detection for WebTV
* Updated the version detection for NetPositive
* Updated the version detection for IE
* Updated the version detection for OmniWeb
* Updated the version detection for iCab
* Updated the version detection for Safari
* Added detection for Chrome
* Added detection for iPhone
* Added detection for robots
* Added detection for mobile devices
* Added detection for BlackBerry
* Added detection for iPhone
* Added detection for iPad
* Added detection for Android
* Removed Netscape checks
* Updated Safari to remove mobile devices (iPhone)

### This solution identifies the following Operating Systems:

* Windows (Browser::PLATFORM_WINDOWS)
* Windows CE (Browser::PLATFORM_WINDOWS_CE)
* Apple (Browser::PLATFORM_APPLE)
* Linux (Browser::PLATFORM_LINUX)
* Android (Browser::PLATFORM_ANDROID)
* OS/2 (Browser::PLATFORM_OS2)
* BeOS (Browser::PLATFORM_BEOS)
* iPhone (Browser::PLATFORM_IPHONE)
* iPod (Browser::PLATFORM_IPOD)
* BlackBerry (Browser::PLATFORM_BLACKBERRY)
* FreeBSD (Browser::PLATFORM_FREEBSD)
* OpenBSD (Browser::PLATFORM_OPENBSD)
* NetBSD (Browser::PLATFORM_NETBSD)
* SunOS (Browser::PLATFORM_SUNOS)
* OpenSolaris (Browser::PLATFORM_OPENSOLARIS)
* iPad (Browser::PLATFORM_IPAD)

### This solution identifies the following Browsers and does a best-guess on the version:

* Opera (Browser::BROWSER_OPERA)
* WebTV (Browser::BROWSER_WEBTV)
* NetPositive (Browser::BROWSER_NETPOSITIVE)
* Internet Explorer (Browser::BROWSER_IE)
* Pocket Internet Explorer (Browser::BROWSER_POCKET_IE)
* Galeon (Browser::BROWSER_GALEON)
* Konqueror (Browser::BROWSER_KONQUEROR)
* iCab (Browser::BROWSER_ICAB)
* OmniWeb (Browser::BROWSER_OMNIWEB)
* Phoenix (Browser::BROWSER_PHOENIX)
* Firebird (Browser::BROWSER_FIREBIRD)
* Firefox (Browser::BROWSER_FIREFOX)
* Mozilla (Browser::BROWSER_MOZILLA)
* Amaya (Browser::BROWSER_AMAYA)
* Lynx (Browser::BROWSER_LYNX)
* Safari (Browser::BROWSER_SAFARI)
* iPhone (Browser::BROWSER_IPHONE)
* iPod (Browser::BROWSER_IPOD)
* Google’s Android(Browser::BROWSER_ANDROID)
* Google’s Chrome(Browser::BROWSER_CHROME)
* GoogleBot(Browser::BROWSER_GOOGLEBOT)
* Yahoo!’s Slurp(Browser::BROWSER_SLURP)
* W3C’s Validator(Browser::BROWSER_W3CVALIDATOR)
* BlackBerry(Browser::BROWSER_BLACKBERRY)
