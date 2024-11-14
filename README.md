# `@jimbojet/scriptable`

[![Azure Publish (PROD.main)](https://github.com/jimmy-zhening-luo/scriptable/actions/workflows/PROD.main.yml/badge.svg)](https://github.com/jimmy-zhening-luo/scriptable/actions/workflows/PROD.main.yml)

## What is Scriptable?

Scriptable iOS/iPadOS lets users author JavaScript procedures invokable by Apple Shortcuts or Widgets, useful for complex device/home automation and data transforms.

Scriptable provides all the classes needed to interact with the above native iOS features and with the user.

## What is `@jimbojet/scriptable`?

This TypeScript project provides a standard class with hooks for Shortcut and filesystem I/O (e.g. settings/cache), transpiling to valid Scriptable code.

## Usage

### Vocabulary

There are two types of scripts.

#### `App`

Top-level `JavaScript` file in your device's `Scriptable` folder. It is visible in the Scriptable app UI, force push menu, Share Sheet, Shortcuts, etc.

#### `Library`

`JavaScript` file in a subdirectory of your device's `Scriptable` folder. It can not be directly invoked, and can only be used within another script (App or Library) via [`importModule`](https://docs.scriptable.app/importmodule/).

### EASY: Write `Library` scripts

There are two (2) special requirements for writing a `Library`:

1. `Library` scripts must ___not___ be in the top-level directory of your device's `Scriptable` folder. Instead, they must be in any of the following:
    - A subdirectory of your device's `Scriptable` folder
    - Anywhere (top-level or otherwise) in a [place](https://docs.scriptable.app/importmodule/) where Scriptable's `importModule` function will look
2. (Identical to [`App` requirement](#write-app-scripts)) Your script must only use the following globals:
    - [`Scriptable` objects](https://docs.scriptable.app/)
    - Apple [`JavaScriptCore`](https://developer.apple.com/documentation/javascriptcore) native objects

### Write `App` scripts

Conversely, there are three (3) special requirements for writing an `App`:

1. Your script must be in the top-level directory of your device's `Scriptable` folder.
2. Your script must only use the following globals:
    - [`Scriptable` objects](https://docs.scriptable.app/)
    - Apple [`JavaScriptCore`](https://developer.apple.com/documentation/javascriptcore) native objects
3. Your Script must begin with a very specific [header](./.vscode/Header.code-snippets):

#### The Header &trade;

This project has `VSCode` [snippets](./.vscode/Header.code-snippets) to generate Lines 1-3 (and optionally 4) of the Scriptable Header.

Its grammar is implemented from the source of truth below:

#### Line 1
> `// Variables used by Scriptable.`

#### Line 2
> `// These must be at the very top of the file. Do not edit.`

#### Line 3
Line 3 specifies your `App`'s icon in Scriptable UI.

```javascript
// icon-color: $COLOR; icon-glyph: $GLYPH;
```

- `$COLOR` is a color from a [predefined list](#color).
- `$GLYPH` is a glyph from a [predefined list](#glyph).

> [!IMPORTANT]
> ___HUGE___ credit to __@nlawler1737__ for being the first (to my knowledge) to document the possible values for `$COLOR` and `$GLYPH`.

##### [`$COLOR`](https://github.com/nlawler1737/Scriptable/blob/main/Glyph%20%26%20Color%20Changer.js)

<details>
<summary>Colors (18)</summary>

| Name | Color |
| --- | --- |
| `red` | `hsl(6, 68%, 55%)` |
| `pink` | `hsl(343, 68%, 55%)` |
| `purple` | `hsl(286, 54%, 47%)` |
| `deep-purple` | `hsl(260, 48%, 51%)` |
| `deep-blue` | `hsl(234, 48%, 55%)` |
| `blue` | `hsl(213, 75%, 61%)` |
| `cyan` | `hsl(192, 55%, 59%)` |
| `teal` | `hsl(172, 32%, 49%)` |
| `deep-green` | `hsl(110, 40%, 55%)` |
| `green` | `hsl(84, 45%, 58%)` |
| `yellow` | `hsl(43, 77%, 62%)` |
| `orange` | `hsl(32, 78%, 58%)` |
| `light-brown` | `hsl(23, 37%, 48%)` |
| `brown` | `hsl(19, 44%, 39%)` |
| `deep-brown` | `hsl(27, 47%, 29%)` |
| `light-gray` | `hsl(235, 5%, 54%)` |
| `gray` | `hsl(227, 6%, 44%)` |
| `deep-gray` | `hsl(210, 8%, 30%)` |

</details>

###### [`$GLYPH`](https://github.com/nlawler1737/Scriptable/blob/4ccf80b72ef5f15d4ed00b282988612bb9dbf4fc/iconGlyphCss.txt#L17)

<details>
<summary>Glyphs (809)</summary>

```txt
ad
address-book
address-card
adjust
air-freshener
align-center
align-justify
align-left
align-right
allergies
ambulance
american-sign-language-interpreting
anchor
angle-double-down
angle-double-left
angle-double-right
angle-double-up
angle-down
angle-left
angle-right
angle-up
angry
ankh
apple-alt
archive
archway
arrow-alt-circle-down
arrow-alt-circle-left
arrow-alt-circle-right
arrow-alt-circle-up
arrow-circle-down
arrow-circle-left
arrow-circle-right
arrow-circle-up
arrow-down
arrow-left
arrow-right
arrow-up
arrows-alt
arrows-alt-h
arrows-alt-v
assistive-listening-systems
asterisk
at
atlas
atom
audio-description
award
backspace
backward
balance-scale
ban
band-aid
barcode
bars
baseball-ball
basketball-ball
bath
battery-empty
battery-full
battery-half
battery-quarter
battery-three-quarters
bed
beer
bell
bell-slash
bezier-curve
bible
bicycle
binoculars
birthday-cake
blender
blind
bold
bolt
bomb
bone
bong
book
book-open
book-reader
bookmark
bowling-ball
box
box-open
boxes
braille
brain
briefcase
briefcase-medical
broadcast-tower
broom
brush
bug
building
bullhorn
bullseye
burn
bus
bus-alt
business-time
calculator
calendar
calendar-alt
calendar-check
calendar-minus
calendar-plus
calendar-times
camera
camera-retro
cannabis
capsules
car
car-alt
car-battery
car-crash
car-side
caret-down
caret-left
caret-right
caret-square-down
caret-square-left
caret-square-right
caret-square-up
caret-up
cart-arrow-down
cart-plus
certificate
chalkboard
chalkboard-teacher
charging-station
chart-area
chart-bar
chart-line
chart-pie
check
check-circle
check-double
check-square
chess
chess-bishop
chess-board
chess-king
chess-knight
chess-pawn
chess-queen
chess-rook
chevron-circle-down
chevron-circle-left
chevron-circle-right
chevron-circle-up
chevron-down
chevron-left
chevron-right
chevron-up
child
church
circle
circle-notch
city
clipboard
clipboard-check
clipboard-list
clock
clone
closed-captioning
cloud
cloud-download-alt
cloud-upload-alt
cocktail
code
code-branch
coffee
cog
cogs
coins
columns
comment
comment-alt
comment-dollar
comment-dots
comment-slash
comments
comments-dollar
compact-disc
compass
compress
concierge-bell
cookie
cookie-bite
copy
copyright
couch
credit-card
crop
crop-alt
cross
crosshairs
crow
crown
cube
cubes
cut
database
deaf
desktop
dharmachakra
diagnoses
dice
dice-five
dice-four
dice-one
dice-six
dice-three
dice-two
digital-tachograph
directions
divide
dizzy
dna
dollar-sign
dolly
dolly-flatbed
donate
door-closed
door-open
dot-circle
dove
download
drafting-compass
draw-polygon
drum
drum-steelpan
dumbbell
edit
eject
ellipsis-h
ellipsis-v
envelope
envelope-open
envelope-open-text
envelope-square
equals
eraser
euro-sign
exchange-alt
exclamation
exclamation-circle
exclamation-triangle
expand
expand-arrows-alt
external-link-alt
external-link-square-alt
eye
eye-dropper
eye-slash
fast-backward
fast-forward
fax
feather
feather-alt
female
fighter-jet
file
file-alt
file-archive
file-audio
file-code
file-contract
file-download
file-excel
file-export
file-image
file-import
file-invoice
file-invoice-dollar
file-medical
file-medical-alt
file-pdf
file-powerpoint
file-prescription
file-signature
file-upload
file-video
file-word
fill
fill-drip
film
filter
fingerprint
fire
fire-extinguisher
first-aid
fish
flag
flag-checkered
flask
flushed
folder
folder-minus
folder-open
folder-plus
font
football-ball
forward
frog
frown
frown-open
funnel-dollar
futbol
gamepad
gas-pump
gavel
gem
genderless
gift
glass-martini
glass-martini-alt
glasses
globe
globe-africa
globe-americas
globe-asia
golf-ball
gopuram
graduation-cap
greater-than
greater-than-equal
grimace
grin
grin-alt
grin-beam
grin-beam-sweat
grin-hearts
grin-squint
grin-squint-tears
grin-stars
grin-tears
grin-tongue
grin-tongue-squint
grin-tongue-wink
grin-wink
grip-horizontal
grip-vertical
h-square
hamsa
hand-holding
hand-holding-heart
hand-holding-usd
hand-lizard
hand-paper
hand-peace
hand-point-down
hand-point-left
hand-point-right
hand-point-up
hand-pointer
hand-rock
hand-scissors
hand-spock
hands
hands-helping
handshake
hashtag
hdd
heading
headphones
headphones-alt
headset
heart
heartbeat
helicopter
highlighter
history
hockey-puck
home
hospital
hospital-alt
hospital-symbol
hot-tub
hotel
hourglass
hourglass-end
hourglass-half
hourglass-start
i-cursor
id-badge
id-card
id-card-alt
image
images
inbox
indent
industry
infinity
info
info-circle
italic
jedi
joint
journal-whills
kaaba
key
keyboard
khanda
kiss
kiss-beam
kiss-wink-heart
kiwi-bird
landmark
language
laptop
laptop-code
laugh
laugh-beam
laugh-squint
laugh-wink
layer-group
leaf
lemon
less-than
less-than-equal
level-down-alt
level-up-alt
life-ring
lightbulb
link
lira-sign
list
list-alt
list-ol
list-ul
location-arrow
lock
lock-open
long-arrow-alt-down
long-arrow-alt-left
long-arrow-alt-right
long-arrow-alt-up
low-vision
luggage-cart
magic
magnet
mail-bulk
male
map
map-marked
map-marked-alt
map-marker
map-marker-alt
map-pin
map-signs
marker
mars
mars-double
mars-stroke
mars-stroke-h
mars-stroke-v
medal
medkit
meh
meh-blank
meh-rolling-eyes
memory
menorah
mercury
microchip
microphone
microphone-alt
microphone-alt-slash
microphone-slash
microscope
minus
minus-circle
minus-square
mobile
mobile-alt
money-bill
money-bill-alt
money-bill-wave
money-bill-wave-alt
money-check
money-check-alt
monument
moon
mortar-pestle
mosque
motorcycle
mouse-pointer
music
neuter
newspaper
not-equal
notes-medical
object-group
object-ungroup
oil-can
om
outdent
paint-brush
paint-roller
palette
pallet
paper-plane
paperclip
parachute-box
paragraph
parking
passport
pastafarianism
paste
pause
pause-circle
paw
peace
pen
pen-alt
pen-fancy
pen-nib
pen-square
pencil-alt
pencil-ruler
people-carry
percent
percentage
phone
phone-slash
phone-square
phone-volume
piggy-bank
pills
place-of-worship
plane
plane-arrival
plane-departure
play
play-circle
plug
plus
plus-circle
plus-square
podcast
poll
poll-h
poo
poop
portrait
pound-sign
power-off
pray
praying-hands
prescription
prescription-bottle
prescription-bottle-alt
print
procedures
project-diagram
puzzle-piece
qrcode
question
question-circle
quidditch
quote-left
quote-right
quran
random
receipt
recycle
redo
redo-alt
registered
reply
reply-all
retweet
ribbon
road
robot
rocket
route
rss
rss-square
ruble-sign
ruler
ruler-combined
ruler-horizontal
ruler-vertical
rupee-sign
sad-cry
sad-tear
save
school
screwdriver
search
search-dollar
search-location
search-minus
search-plus
seedling
server
shapes
share
share-alt
share-alt-square
share-square
shekel-sign
shield-alt
ship
shipping-fast
shoe-prints
shopping-bag
shopping-basket
shopping-cart
shower
shuttle-van
sign
sign-in-alt
sign-language
sign-out-alt
signal
signature
sitemap
skull
sliders-h
smile
smile-beam
smile-wink
smoking
smoking-ban
snowflake
socks
solar-panel
sort
sort-alpha-down
sort-alpha-up
sort-amount-down
sort-amount-up
sort-down
sort-numeric-down
sort-numeric-up
sort-up
spa
space-shuttle
spinner
splotch
spray-can
square
square-full
square-root-alt
stamp
star
star-and-crescent
star-half
star-half-alt
star-of-david
star-of-life
step-backward
step-forward
stethoscope
sticky-note
stop
stop-circle
stopwatch
store
store-alt
stream
street-view
strikethrough
stroopwafel
subscript
subway
suitcase
suitcase-rolling
sun
superscript
surprise
swatchbook
swimmer
swimming-pool
synagogue
sync
sync-alt
syringe
table
table-tennis
tablet
tablet-alt
tablets
tachometer-alt
tag
tags
tape
tasks
taxi
teeth
teeth-open
terminal
text-height
text-width
th
th-large
th-list
theater-masks
thermometer
thermometer-empty
thermometer-full
thermometer-half
thermometer-quarter
thermometer-three-quarters
thumbs-down
thumbs-up
thumbtack
ticket-alt
times
times-circle
tint
tint-slash
tired
toggle-off
toggle-on
toolbox
tooth
torah
torii-gate
trademark
traffic-light
train
transgender
transgender-alt
trash
trash-alt
tree
trophy
truck
truck-loading
truck-monster
truck-moving
truck-pickup
tshirt
tty
tv
umbrella
umbrella-beach
underline
undo
undo-alt
universal-access
university
unlink
unlock
unlock-alt
upload
user
user-alt
user-alt-slash
user-astronaut
user-check
user-circle
user-clock
user-cog
user-edit
user-friends
user-graduate
user-lock
user-md
user-minus
user-ninja
user-plus
user-secret
user-shield
user-slash
user-tag
user-tie
user-times
users
users-cog
utensil-spoon
utensils
vector-square
venus
venus-double
venus-mars
vial
vials
video
video-slash
vihara
volleyball-ball
volume-down
volume-off
volume-up
walking
wallet
warehouse
weight
weight-hanging
wheelchair
wifi
window-close
window-maximize
window-minimize
window-restore
wine-glass
wine-glass-alt
won-sign
wrench
x-ray
yen-sign
yin-yang
```

</details>

#### Line 4
Line 4 specifies what type of input your `App` can receive from the `iOS` or `iPadOS` `Share Sheet`.

```javascript
// share-sheet-inputs: plain-text, url, file-url, image;
```

The possible types are:

- `plain-text`
- `url`
- `file-url`
- `image`

... and they may be provided as a single type:

```javascript
// share-sheet-inputs: plain-text;
```

... or as a comma-and-space (`,`` `) separated list:

```javascript
// share-sheet-inputs: plain-text, url, file-url, image;
```

... terminated with a semicolon (`;`).
