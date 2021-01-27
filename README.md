<p align="center">
  <a href="https://meokisama.github.io">
    <img src="images/favicon.png" />
  </a>
</p>
<h1 align="center">Meoki The Résumé</h1>

<p align="center">
  <a href="https://github.com/meokisama/meokisama.github.io/blob/develop/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg"/>
  </a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"/>
  <a href="https://twitter.com/intent/follow?screen_name=meokiiii">
    <img src="https://img.shields.io/twitter/follow/meokiiii.svg?label=Follow%20@meokiiii"/>
  </a>
</p>

## How To Install
*This is a site with fully functional email notification mechanism for sending messages via contact form.*

All you need to do is to **upload all template files via your FTP account** to your web server (for uploading files you can use FTP client like **FileZilla​**) and just to modify one line of code in ```config.php​``` file. 

To edit the ```config.php``` you can use any text editor (for example **VSCode​**)

You need to modify **your email addresses** where you want to receive emails filled with information from contact form.

In ​ config.php​ file, you will see this pattern:
```
$email = "yourmail@here.com"; //<-- Your email
```
You need to modify only the value on the right side.

***Do not remove any quote or double quote​ signs while doing this.***

## Folder Structure
```
|
|---​ css
|    |
|    |--- all css files (except main style.css​ file)
|
|
|--- ​images
|    |
|    |--- all demo images
|
|--- ​js
|    |
|    |--- all js files
|
|--- ​php
|    |
|    |--- sendMail.php
|
|--- all .html files
|
|--- style.css (main css​ files)
```

## Which file to edit

Of course, you can edit **any of the files from above** (if you know what
you are doing) also you can add (include) some additional JS/CSS files
for some additional features, but if your skills are limited and you want
just to replace the demo/dummy content with your own, you need:
- To edit ​ ```.html``` ​ files (using some text editor, for example
VSCode​ ) and to change the demo content (text) with your own
- If you don’t need some part from our demo content, I am
suggesting to use comments tags in html files to disable that part.

    *More about HTML comments tags - https://html.com/tags/comment-tag/*
- To override the images from images folder with your own
- Change only main ```style.css``` file to set your own colors, font size,
etc...
- Edit ```config.php``` ​ file and set your own mail address

## Columns layout
For creating columns layout, I don’t use any CSS framework - like
Bootstrap. The columns layout is **very basic** and generally there are
just layout for 2 columns. 

In one case the columns are split **50% 50%** (actually the width of column is 45%), and in other layout is when the columns are split **55% - 45%.**

The code for 2 columns (50%) looks like this:
```
<div class="row">
    <div class="one-half">
        1/2 Column
    </div>
    <div class="one_half last">
        1/2 Column
    </div>
</div>
```
The code for 2 columns (55% + 45%) looks like this:
```
<div class="row">
    <div class="one-half width-55">
        55% Column
    </div>
    <div class="one_half width-45 last">
        45% Column
    </div>
</div>
```

## Front Page ```index.html```
On Home page are placed 6 sections:
**Home, Services, Portfolio, Resume, Skills** and ​ **Contact**. Each section is separated and start with code like this:
```
<!-- Home Section -->
<div id="home" class="section full-width-section">
<div class="section-wrapper block">
```
```
<!-- Service Section -->
<div id="service" class="section">
<div class="section-wrapper block">
```
Also, for each of these sections you will find in main ```style.css``` ​ file appropriate **css code**, like this (example for **Home** section):
```
/* ===================================
5. Home Section CSS
====================================== */
.home-left-part {
    flex: 0 0 370px;
    margin-right: 5%;
}
.home-right-part {
    flex: 1 0 0;
    height: 100%;
    background-image: url(images/home.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}
...
```
Now, for each section we will explain just some part of code which is
specific for it.
### Portfolio Section
#### Portfolio filter
On Portfolio section you will find code for category filtering:
```
<div class="category-filter-list button-group filters-button-group">
<div class="button is-checked" data-filter="*">All</div>
<div class="button" data-filter=".text">Text</div>
<div class="button" data-filter=".video">Video</div>
<div class="button" data-filter=".image">Image</div>
</div>
```
First filter value is **All** and it is important to set ```data-filter=”*”``` to show all items. 

For all **other categories,** the ```data-filter``` has a class name as value. This class should be also included in html code for portfolio item, like this:
```
<div id="p-item-1" class="grid-item element-item p-one-third ​ text​ ">
```
This means, the item will be visible when you select ```text``` in category
filter. You can place one item in two or more categories, just add class
like this:
```
<div id="p-item-1" class="grid-item element-item p-one-third ​ text​ ​ interior​ ​ abstract​ ​ super-mario​ ">
```
#### Portfolio Items Links​
There are 3 different ways how those items are linked:
- Item links to ​ ```portfolio-x.html```​ (ajax load)
- Item links to Pop-Up image (Lightbox)
- Items links to Pop-Up video (Lightbox)
#### Ajax load - Items links to ```portfolio-x.html```
 Portfolio items 1, 2 and 3 are using ajax to load the content inside the
```index.html``` file. When you click on image, the code will load a portfolio html file and will get just content part from that file and show it directly on front/one page.

Here is an example for portfolio item which is loading content via ajax:
```
<div id="p-item-1" class="grid-item element-item p-one-third text">
    <a class="item-link ajax-portfolio" href="portfolio-1.html" data-id="1">
        <img src="images/portfolio1.jpg" alt="" />
        <div class="portfolio-text-holder">
            <div class="portfolio-text-wrapper">
                <p class="portfolio-text">Home</p>
                <p class="portfolio-cat">Text</p>
            </div>
        </div>
    </a>
</div>
```
Portfolio item content is loaded in page using Ajax. The important part
here is this 2 lines of code:
```
<div id="​ p-item-1​ " class="grid-item element-item ​ p-one-third​ text">
<a class="item-link ​ ajax-portfolio​ " href="​ portfolio-1.html​ " ​ data-id="1"​ >
```
Class ```p-one-third​``` means that portfolio item (image) will be **33%
width**. There is an option to set class ```p-two-third​``` and width of the
item will be **66%**.

Class ```ajax-portfolio​``` must be included if you want to have in
page/ajax load. If you remove this class, the link will work on **regular way** and will open the page which you have set in ```href​```.

Another important part, is to set unique ```data-id```​ number of each item like: ```data-id=”1”``` , ```data-id=”2”``` , ```data-id=”3”``` ....

Also, the ```id=”p-item-1”``` ​ must be unique for each item.

So, when you click on portfolio item image, the ajax will load the
content from html file which is set in ```href​``` attribute (in the example
above it is ```portfolio-1.html​``` file).

The ajax will load a whole file, but we are displaying only content which
is placed inside this **div**:
```
<div class="portfolio-item-wrapper center-relative">
...
</div>
```
All content which is placed inside this **div** will be loaded and displayed
on front/home page (```index.html```) using Ajax.
### Image slider
On ```portfolio-1.html``` you will find code like this (**image slider code**):
```
<div class="image-slider-wrapper relative">
    <div class="owl-carousel owl-theme image-slider slider" data-speed="​2000​" data-auto="​ false​ " data-hover="​true​">
        <div class="owl-item">
            <img src="images/item_01.jpg" alt="">
        </div>
        <div class="owl-item">
            <img src="images/item_02.jpg" alt="">
        </div>
        <div class="owl-item">
            <img src="images/item_03.jpg" alt="">
        </div>
    </div>
</div>
```
For image slider you can set slider speed, to set auto start and to
control slider pause on mouse over. You need to change this:
```
data-speed=”2000” data-auto=”false” data-hover=”true”
```
### Item links to Pop-Up image (Lightbox)
Here is an example for portfolio item which links to pop-up image:
```
<div class="grid-item element-item p-one-third image">
    <a class="item-link" href="​ images/item_03.jpg​ " data-rel="prettyPhoto[portfolio]">
        <img src="images/portfolio5.jpg" alt="" />
        <div class="portfolio-text-holder">
            <div class="portfolio-text-wrapper">
                <p class="portfolio-text">Leaf</p>
                <p class="portfolio-cat">Image</p>
            </div>
        </div>
    </a>
</div>
```
As you see the link (```href​``` value) links to the image which will be
opened in the pop-up (Lightbox). In our demo that is image ```item_03.jpg```
### Item links to Pop-Up video (Lightbox)
Here is an example for portfolio item which links to pop-up video:
```
<div class="grid-item element-item p-one-third image">
    <a class="item-link" href="​ https://vimeo.com/199192931​ " data-rel="prettyPhoto[portfolio]">
        <img src="images/portfolio5.jpg" alt="" />
        <div class="portfolio-text-holder">
            <div class="portfolio-text-wrapper">
                <p class="portfolio-text">Leaf</p>
                <p class="portfolio-cat">Image</p>
            </div>
        </div>
    </a>
</div>
```
As you see the link (```href``` value) links to the **Vimeo** video which will be
*opened in the pop-up* (Lightbox). 

Also, you can use **YouTube video** in format https://youtube.com/watch?v=XXXXXXXXX

## CSS Structure
In ```css```​ folder are placed all css files except the main **style.css** file which
is in the root folder.

Basically, **you don’t need to change any of this css files** which are placed
in ​ css​ folder - the only css file which may you need to change (*if you
need it at all*) is ```style.css``` file.

In ```style.css``` file you will find code for each section and also for other
parts like **image slider**, **contact forms**, *etc...* and each of this part is to
start with code (comment code) like this:
```
/* ===================================
6. Service Section CSS
====================================== */
```
so you will easily find css code each part.

## JS Structure
In ​```js```​ folder are placed all js files.

There are all 3rd party js files (files for sliders, isotope, jquery, etc...)
except the ```main.js``` - ​ this is our custom file.

In this file you will find the code for setting up the **image slider**, **menu**,
**sending mails**, *etc....*

If you need to change some part here, in JS code, you will need to have
some JS skills to do that.

## Source & Credits
- jQuery Isotope Plugin
  - http://isotope.metafizzy.co
- HTML5 Fallback Support
    - https://code.google.com/p/html5shiv
- Respond JS
    - https://github.com/scottjehl/Respond
- jQuery
    - http://jquery.comGoogle 
- Web Fonts
    - http://www.google.com/webfonts
- Smart Menus
    - http://www.smartmenus.org/
- Owl Carousel 2
    - https://owlcarousel2.github.io/OwlCarousel2/
- Circle Progress
    - http://kottenator.github.io/jquery-circle-progress/
- prettyPhoto
    - http://www.no-margin-for-errors.com/
## Find me around the web 🌎:
<a href="https://facebook.com/slytherinnn/"><img align="left" width="150" height="150" src="https://github.com/meokisama/meokisama/blob/master/image/2750554.png"> </a>
- Information in public on <a href="https://meokisama.github.io/">__Blog__</a> ✍🏾
- Sharing updates on <a href="https://facebook.com/slytherinnn/">__Facebook__</a> 💼
- Other products on <a href="https://www.behance.net/meokisama">__Behance__</a> 🏓
- Daily photos on <a href="https://www.instagram.com/hi.im.meoki/">__Instagram__</a> 📷
- "Wibu" collection on <a href="https://www.flickr.com/photos/meokisama/albums">__Flickr__</a> 👾