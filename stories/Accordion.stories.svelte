<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Accordion from "../src/lib/components/Accordion/Accordion.svelte";
  import AccordionItem from "../src/lib/components/Accordion/AccordionItem.svelte";

  const { Story } = defineMeta({
    title: "Components/Accordion",
    component: Accordion,
    subcomponents: { AccordionItem },
    argTypes: {
      allowMultiple: { control: "boolean" },
      bordered: { control: "boolean" },
      defaultExpanded: { control: "number" },
    },
  });
</script>

<Story name="Default" args={{ defaultExpanded: 0, bordered: true }}>
    safdadfsdf
  <Accordion defaultExpanded={0} bordered={true}>
    asdfasdf
    <AccordionItem>
      <svelte:fragment slot="header">What is Twintrinsic?</svelte:fragment>
      <p>
        Twintrinsic is a Tailwind-based Svelte 5 component library emphasizing
        accessibility, extensibility, and performance through semantic HTML and
        CSS-first approaches.
      </p>
    </AccordionItem>
    <AccordionItem>
      <svelte:fragment slot="header">How do I use it?</svelte:fragment>
      <p>
        Simply import the components you need and use them in your Svelte
        applications. All components are fully typed with TypeScript and support
        modern Svelte 5 runes.
      </p>
    </AccordionItem>
    <AccordionItem>
      <svelte:fragment slot="header">Is it accessible?</svelte:fragment>
      <p>
        Yes! All components are WCAG 2.1 compliant with proper ARIA labels,
        semantic HTML, and full keyboard navigation support.
      </p>
    </AccordionItem>
  </Accordion>
</Story>

<Story name="Allow Multiple Expanded" args={{ allowMultiple: true, bordered: true }}>
  <Accordion allowMultiple={true} bordered={true}>
    <AccordionItem>
      <svelte:fragment slot="header">Feature One</svelte:fragment>
      <p>You can expand multiple accordion items at the same time when allowMultiple is enabled.</p>
    </AccordionItem>
    <AccordionItem>
      <svelte:fragment slot="header">Feature Two</svelte:fragment>
      <p>This is useful when you want to compare information across different sections.</p>
    </AccordionItem>
    <AccordionItem>
      <svelte:fragment slot="header">Feature Three</svelte:fragment>
      <p>All sections can remain open simultaneously for easy reference.</p>
    </AccordionItem>
  </Accordion>
</Story>

<Story name="No Border" args={{ bordered: false, defaultExpanded: 0 }}>
  <Accordion bordered={false} defaultExpanded={0}>
    <AccordionItem>
      <svelte:fragment slot="header">Borderless Style</svelte:fragment>
      <p>This accordion has no borders, giving it a cleaner, more minimal appearance.</p>
    </AccordionItem>
    <AccordionItem>
      <svelte:fragment slot="header">Subtle Design</svelte:fragment>
      <p>Perfect for integrating seamlessly into your page layout without visual separation.</p>
    </AccordionItem>
    <AccordionItem>
      <svelte:fragment slot="header">Modern Look</svelte:fragment>
      <p>The borderless style works great with modern, minimalist design systems.</p>
    </AccordionItem>
  </Accordion>
</Story>

<Story name="All Items Collapsed" args={{ defaultExpanded: null, bordered: true }}>
  <Accordion defaultExpanded={null} bordered={true}>
    <AccordionItem>
      <svelte:fragment slot="header">First Item</svelte:fragment>
      <p>All accordion items start in a collapsed state with this configuration.</p>
    </AccordionItem>
    <AccordionItem>
      <svelte:fragment slot="header">Second Item</svelte:fragment>
      <p>Users must click to expand any section they want to view.</p>
    </AccordionItem>
    <AccordionItem>
      <svelte:fragment slot="header">Third Item</svelte:fragment>
      <p>This is useful when you want users to explicitly choose what content to view.</p>
    </AccordionItem>
  </Accordion>
</Story>
