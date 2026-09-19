# User Feedback

This is a list of problems I have found, by using the docs. The issues may be from integrations or components or whatever - I am just using the docs app and giving feedback.

### All pages / General
All the pages need to be standardized. Some of the examples don't show the demo code, they only have the code. All of them need to have the code and the examples. The sections need to be arranged as such: Name, description (all descriptions are lacking in information), Responsiveness Notes, Customization, Examples (add tabbed interface for example/code, as described in Examples/General below), Slots, Props, Events, Accessibility, and Keybboard Support. All pages should have those sections, in that order. Basically, Info for humans, then examples, then info for computers.

The internal scrollbars are not visible in light theme - they are too closely colored to the background.

The sidebar menu should highlight depending on what page we are on. It should also expand automatically to the current page.

When sizing down, the appheader disappears. I think the appheader menu does not collapse like it should. The sidebar also collapses, but the content does not move over. It also appear the menu items are still there instead of hidden. Maybe it'snbecause there are no icons to render. Maybe we should add icons and hover text when the menu is collapsed so the user will know there is somethign there.

I'm not really certain we need the *Items as separate docs since they aren't used solo. AccordionItem, BreadcrumbItem, etc, should be incorporated into their enclosing components' docs.

We need to work on suporting internationalization, including lef to right reading order. All our docs pages should have a left-to-right toggle so users can see how well it works. We should also be using the -start- and -end- tailwind classes (i.e. text-start, text-end instead of text-left, text-right). I would like the demo pages to be translated to Persian. We have support for translations using paraglide and need to start integrating that into our components, if we even need to.

We need to support passing the HTML props to the underlying html elements in all components. We don't need to handle some of them, just pass them along, so our compoennt props can get the ...rest of the props and pass that to the component instead of keeping a running list of all the things the underlying component uses. We can read what we need to, then pass the rest on down.

We can acheieve better native support by using the datalist element. See https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/datalist for uses. We can use it with the dropdown, combobox,  range, and other elements. Perhaps we can build something like a JS helper to use datalists in unsupported ways, like for tickmarks in donnutCharts.

### Examples / General
All of the guides for the examples need to be standardized. They are written vastly different. I like the Shopping Page guide the best - with the code examples and example usage details forthe demo. Maybe add a WHY we use this component in the guide. A little more about the shopping page at the top would be nice. Maybe ahave a tabbed interface for the code/example. So for Hero Header, it would show a tab that allows to to switch between the example in the demo and the code to generate it. We could incorporate the best practices with the components in the page, maybe with an Alert component (see Feedback/Alert below).

### Feedback / Alert
We need a new component for inline alerts - sections that call out important information or warnings to the user. These could go anywhere in a page to call out things or show alerts to users on page load or whatever. This could be used for things like "You have 3 new messages" or "Your account is almost full", or, with an icon, an informative bit about the parts of the page, like the Best Practices section in the shopping page example guide. I think have a few different styles of alerts would be cool - one with slighly different colored background and a thick border on only one side would be nice.

### Examples / Game Map
The guide is missing 

### Examples/Shoppping Page

The shopping page scrolls all of the page. It has 2 scrollbars - one for the content, like it should have, and one for the whole page which scrolls the app itsef.

### App / App

There are a lot of issues here. The sidebar is supposed to be hidden when the window is narrow enough. The appheader is supposed to show the menu icon so users can show/hide the sidebar. The menu on the appheader is supposed to collapse to another dropdown navigation menu. Actually, I think we should include the top menu in the sidebar menu and have those hide and show depending on the window width.

There is also an issue where the small version (narrow version) of the sidebar does not show anything but hte chevrons from the collapsible menu items. We should show dots or something to denote that there are other menu items there you can click on, and let the tooltips show what they are.

### App / BottomBar
The demos are awful and they don't work. I don't knwo if the component is broken or the page is broken, but the demos definitely are. We should include more demos, like from the flowbite site - https://flowbite.com/docs/components/bottom-navigation/. We don't need their code, just the same demos - Menu Items, Application Bar (we may need to alter the component code to add a "float" option for this), navigation like with an e-reader, card with bottom bar, meeting control bar, and video player. 

### App / Sidebar
The demos don't work well. The demos need a border to show the separation between the examples and the rest of the page. When we implemtn the tabbed demo/code, this should fix that. Otherwise, the Basic sidebar demo does not appear to extend to the bottom of the container. The right-positioned sidebar is not right-positioned. 

### App / ThemeToggle
we can remove the nested theme demo. We do not supprot nested themes yet. The app itself also scrolls on this page.

### Basic / AccordionItem
We need to have this incorporated with the Accordion docs. there's no reason to have this separate since it can't be used separately. 
 The header should be a prop on the item AND a snippet for more detailed control. So the usage should be something like:
```tsx
<AccordionItem header="Getting started">
    Install the package and import the components you need.
  </AccordionItem>
```
AND
```tsx
<AccordionItem>
    {#snippet header()}<h3 class="font-medium">Getting started</h3>{/snippet}
    Install the package and import the components you need.
  </AccordionItem>
```
If both are used, the snippet takes precedence.

### Basic / Separator

All of the examples should go all the way across the page. Only the first one does. This component needs to be reworked so that it only uses the hr component. Modern CSS can take an attribute and render it ::before or ::after, then style it. There is no need to render a div here for text.

### Navigation / Breadcrumb

There is no need to have sunch a complex set of components for this. The breadcrumb component should take a list of objects that has the name, icon, and link of the items.

The collapsed demo doesn't appear to collapse anything. For collapsed breadcrumbs, we need a "..." in the middle to denote missing elements, with the missing elements shown on hover. When we click on the "..." in the middle, it should expand all the way, on the top layer, to allow use to select any of the items. If we use the popover API, we can get click-away actions for free.

### Navigation / Menu

We are trying to develop a data-driven component lib, so the menu should take a list of objects instead of having MenuItems. It is WAY easier to build a js object than to build the html. As such, we need to get rid of MenuItem.

### Navigation / Tabs

I think this needs to be re-engineered as well. The Tabs component should take a list of objects as well. The object should be something like:

```tsx
{
    id: String,
    idx: int,
    label: string,
    href: URLString,
    disabled?: boolean,
    icon?: string,
    badge?: string,
    content: ({id, idx, label, href, disabled, icon, badge}) => {},
    cachedContent: ({id, idx, label, href, disabled, icon, badge}) => {},
    onShow: ({id, idx, label, href, disabled, icon, badge}) => {},
    onHide: ({id, idx, label, href, disabled, icon, badge}) => {},
}
```
The TabPanel could take a idx prop that matches the idx of the tab, and it will be displayed when that tab is active. The `content` function would be called to render the content of the tab, so we could use it to load dynamic content. This would have the benefit of only loading the content when the tab is active. The `cachedContent` function would be called to render the content of the tab, but it would be cached so that it doesn't have to be reloaded when the tab is activated again.

All this would negate Tab and Tablist components. We should look into whether or not we can use Svelte to see the child elements so maybe we can eliminate TabPanel altogether and just tab through the child components. Althgouh I am not too sure this would satisfy all our use-cases.

### Navigation / TreeMenu

The demo code needs to use the CodeBlock component.

### Data Display / Carousel

The dark mode text in the demos is hard to read. We need to have special global classes in tailwind.css for [type="primary"], etc that style the text and background appropriately so we don't have to use the `*-primary*` classes.

The demos don't seem to be working. Maybe the component itself doesn't work. We should make sure we are using the correct implementation, see https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overflow/Carousels for how to do this in CSS.

The image demo needs to use different images.

I am pretty sure we can style the carouses items with CSS, per that MDN link. We don't need carouselitems, we can just select the items with css.

### Data Display / Chip

the removalble chips do not remove when clicked. The remove button should remove the chip, but if there is a onremove and it returns false, then the chip should not be removed.

The icons demo should have the svg like it is now, but also support an icon string that is passed to the Icon component. In fact, the svg shoud be passed to the Icon component and that component should support the rendering. 

The avatar param shoukd use the avatar component instead of just rendering the htnl/img/etc directly.

### Data Display / ChipGroup

The chip group dynamic items demo needs to actual demo it - it needs to remove items, add items, and update items.

The selectable group demo needs to show the selected items.

Multiple selection doesn't seem to be working.

We should make sure the underlying selection uses checkboxes. We should have a new prop for checkboxes that is just `chip` that styles the element like a chip (that uses the Chip component), so we can support it in this group.

### Data Display / CodeBlockSpeed

Only the first item on the page is rendered properly.

We need to add a demo comparison and a bit about what is different between the CodeBlock component and this one to allow users to choose one over the other. If we use the rendering time display, we can show users what the diference is.

### Data Display / CodeEditor

None of the examples look to be syntax highlighted.

The line numbers on the left should not stand out so much - they maintain a white background even with dark mode.

The dracula theme does not work, presumable because none of the other theming works.

In order to build a better component, we need to see if we can extend the component vertically to fill the available space. The line numbers shoould extens to the bottom of the parent element.

### Data Display / Map

the custom markers demo looks blank

the interactoive marker creattion demo is not working. clicking does nothing.

The image with CRS demo looks blank

### Data Display / Skeleton

This needs to be moved to the app section. Its primary purpose is to show components loading, not just data.

The component needs to have several animations - fade, pulse, shimmer, etc. For the shimmer effect, see https://markus.oberlehner.net/blog/skeleton-loading-animation-with-vue/

We should add examples for some of our other compoennts. Like a loader that looks like a card, table, tree, section, and some others, to show how to make a loader that looks like the content. Maybe in the future, we can add a prop to automatically generate a loader that looks like the content.

This page also scrolls the app compoennt.

### Data Display / Table

This compoennt also needs to support data and skeleton loading.

The stripes don't work. They should be done with CSS. So table[striped] should have alternating row colors.

The table needs to be better aligned. THe first column doesn't have any left padding so the text runs into the border. The header shoukd be bottom-aligned with a little padding. The table rows should support alignment options. The last column, by default, should be right-aligned.

I think we can get rid of TableBody,  TableCell, TableHead, TableHeader, TableRow components. I don't think we are using them. We certainly aren't using them for out Table compoennt. We need to update the Table component docs in the component code.

### Data Display / Tag

We need to have a bit about this compoennt vs the Badge component. It doesn't look like there is any difference. I think we should keep one component to handle all use-cases across both components.

### Data Display / Timeline

We need to make a horizontal timeline component and example.

We need to create a cool example where we use a timeline. I don't really know what to show, but something useful. Maybe something like the demos on https://primevue.dev/timeline/. I think a cool demo would be to read a github log and build a timeline of commits, then combine that with ticket data so we get a cool visualization of work done over time. The ticket would be on the top and clicking on certain actions - git log, ticket data, status, would show those in a timeline. The ticket data would look like the "Custom" demo on that primevue page, but with ticket data instead. The status would show something like the "Interactive" demo where it shows the steps to competion and the dates, times, persons, and notes, of the steps to deployment. Each unfinished step can have a notes then allow the user to switch to the status.

### Data Dsiplay / TimelineItem

This page should probanbly be removed. it is unstyled and has no real content.

### Data Display / Tooltip

I don't think this is a Data Display  element. It should be under Basic.

All tooltips have scrollbars but shouldn't. The tooltip should expand to the content, not have scerollbars.


### Data Dsiplay / Tree

The examples need more descriptions. I don't know what "with connecting lines" is supposed to be.

Expanded by default should be all items expanded. 

The Tree element needs to be revamped. It is a data-driven component and should take data instead of building from TreeNodes. The TreeNode should be removed.

### Metrics / DonutChart

This seems to be exactly the same as the piechart, but with a hole in the middle. We should remove this component and just use the piechart component with a hole prop. 

The donut/Pie chart should take a prop, `start`, that is a percentage or a location: top, right, bottom, left, or like 90deg (same as top). It should also take another prop "counter-clockwise" that is a boolean.

We need the ability to put Text in the middle - a large number and a small label underneath

We need the ability to "pull" out a slice of the donut/pie so that it looks "active", and have the data say which is active so we can tie it to different elements and data.

We should add interactivity to the pie/docunt that malkes the clicked slice "active" and activates a callback. (We should use this in a demo to show/hide info on that piece of data.)

We need to add a tooltip to the slices so that when we hover over them, we see the full data. 

We need to add outside labels to the chart, with options to show lines that point to the slices. We also need to add labels to the individual slices so they are on top of them. 


### Metrics / LineChart

We need to add tooltips to the graphs. If the user specifies "follow" for the linechart, the tooltip will follow along the graphs with the x-coord of the mouse. Otherwise, the tooltip will show the data for the closest point on the graph. If the user clicks, the tooltip will stay where it is, then click again to follow.

If possible, we should support smoothing out the lines and stepping the lines. The options could be stepType="smooth|linear(default)|step"

We need to add quite a bit on when to use area vs line vs area charts. We need to do more research on how and when and why to use them and include that in the docs. One of ur goals with this project is to have information on when and why to use each component. We need to support all the use-cases for each o four charts.

### Metrics / StatsCard

I think we can calculate the trend direction from the value, based on whether it is positive or negative or has a plus sign or negative sign at the beginning. Maybe we need to do research on ways to get values from other languages and determine positive/negative. Although this might be overkill, as I think most languages use the plus and minus signs.

I would also like to add a MetricTrend to the stats card to show the trend over time. 

### Metrics / KPICard

I think we need more info on when to use this component vs the stats card. If there is very little difference, maybe we can support the progress bar in the stats card.

We need more examples to showcase what all the options are.


### Metrics / ProgressMetric

We should add a tooltip to the progress bar that shows the percentage and the value.

We need to use an actual progress bar instead of rolling our own. Maybe we can just use the Progress component instead of this one, but add the features of this to that so we can create the same thing with Progress instead of having 2 components that do roughly the same thing. Then we could use the Progress in the statsCard to get  a KPICard. We could add information about using a KPICard to the statsCard info, and a bit about using the ProgressMetric with the Progress component.

### Form / Autocomplete

I think we need to have a way to specify where the selected item chips show up - start,end,top,bottom. The start and end options would make it look like the chips are in the text box.

We need more demos to showcase all the options.

### Form / Button

We need to use the Icon component for the icon. We also could support using an avatar component for the avatar. We should be doing this for all components.

This page also scrolls the App.


### Form / Calendar

The calendar popup shows up at the top of the page. 

I think we need to use a date input underlying this. we can style the  icon using `::-webkit-calendar-picker-indicator`. I think we can style the individual parts as well, like month, day, etc. To date, the only thing we can't style is the popup. We should route input to the date input for validation, etc. Maybe we can take some tips from https://github.com/codeclown/native-datepicker

### Form / ColorPicker

We need to use a native colorpicker for the core of this element. We can handle validations and other stuff by passing to the native colorpicker and then handling the events. This also gives us aria support for free.

### Form / ComboBox

We should try this out, but I think we can style native select elements so most of the code for this should be styling for the element. See https://github.com/codeclown/native-datepicker.

There is info on all the native form elements at https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Styling_web_forms

Native type/search support can be done with vanilla html:

```html
<label for="ice-cream-choice">Choose flavor:</label>
<input type="text" list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />

<datalist id="ice-cream-flavors">
  <option value="Chocolate"></option>
  <option value="Coconut"></option>
  <option value="Vanilla"></option>
</datalist>
```

### Form / Dropdown

What is the diffrerence between this and the combobox? We need a section int he docs about the combobox vs other similar types of components.

### Form / FileUpload

We need to use the file inpu at the core of this. All the features are supported and more. We shoukd add a camera capture to this. Or maybe a camera component that allows easy access to the camera api and to upload images from the camera, using the fileupload input. We shoukd add a way to upload multiple files at once, along with a display of the file information. We shoukd add icons (with the Icon component, and use a map for mimetypes with a default that is from the [FileIcons](https://github.com/file-icons/icons)) for every file that is going to be uploaded.


### Form / FloatLabel

This component does not appear to work. I can't see the label.

Also, I think the placeholder should be the same as the floating label and I don't see any placeholder text.

### Form  / FormField

We need to add more examples here. I would like to see one for a typical bootstrap horizontal input group where the label is on the left and the input is in the middle and an icon is on the right.

### Form / Form

The spacing between formfields needs to be adjusted - the fields are touching each other. I don't know if this is an issue with Form or FormField, but the demo/default for FormFields inside Forms should have spacing.

### Form / FormBuilder

We should have a new component that builds forms from data. It shoukd take an openapi specification and build a form for it. We do not need an external lib for this - we can do it by parsing the json data and building the form from it. The 3rd-party libs have all sorts of extra stuff we will never use. The formbuilder should also take just an array of general simple objects and build a form from it. This is a large undertaking so should be built separately.

### Form / Input

The With Icons demo does not work. It is supposed to be a passwrod inout, but the "show password" icon does not work.

### Form / InoutSwitch

The thumb does not move all the way to the right when the switch is on.

We need to make sure the underlaying component is a checkbox. This component should be just a checkbox and a bunch of styles as this is a common thing and CSS-only switch tutorials are all over the place online.


### form / Knob

The With Value Display example doe snot appear to work. It shows the value, but is not interactive and the thumb is missing.

### Form / NumberInout

The suffixes overlay the buttons. Suffix should take an icon name as well. If the suffix is longer than 3 characters, we shouldl assume it is an icon.

### Form / Rating

This needs a lot more testing. When I click on any star, it toggles from 1 to 3 and back, instead of just removing the one star. The issue seems happen depending on whether I am clicking in the middle of the star or near the edges.

### Form / SelectGroup

I don't think we need this. We should use the Select element for the same functionality.

### Form / Switch

We have 2 switch elements. If there is a differece bwtweem the switch and inoutswitch, the inoutswitch's features shoukd be added here.

### Feedback / Modal

The scrollabel demo needs to be updated with a much longer scrollable text. The scroll doesn't show for me and I have a normal screen resolution.

### Feedback / Stepper

The Basic stepper demo doesn't really work. The step titles are shown too far down, but should be to the right of the step number. The other text is not shown at all. The code/demo tabs aren't used on this page either.

The Vertical Stepper doesn't really work either. The first step is visible, with no way to show th others.

The label prop should also be a snippet.


### Feedback / StepperStep

This shoukd just be renamed to Step. The docs page isn't necessary either because this is not a standalone component.

### Feedback / Toast

The toast should use the popover api. Most of the javascript can be eliminated. We should also use other twintrinsic components whenever we can. For instance, the progress bar should be a twintrinsic progress element. In fact, we should create a Timer element that uses other elements like progress, Gauge Chart, etc. to display a countdown. Maybe even tie in a KPICard so it so it ticks down from the count. We should make the timer count up or down, have different timings, and be able to be paused, resumed, and stopped. Then we can use that as the display for the toast with timer.

The toast positions do not position the toast anywhere but bottom left. We should support all 8 positions (left, right, top, bottom, top left, etc.), offsets, and stacking order (bottom, top, one at a time, etc.).

### Utility / LazyPanel

Do we really need this component? I think the lazy component can handle this. What is the difference?


### Themeing / Theme Preview

The badges in all the theme cards are static with respect to the window. They stay in place when scrolled, instead of moving with the other content. They also overlap each other. I think this is causing the app element itself to scroll instead of just the content area.