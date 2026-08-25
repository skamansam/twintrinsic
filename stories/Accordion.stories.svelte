<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent } from "storybook/test";
  import Accordion from "../src/lib/components/Accordion/Accordion.svelte";
  import AccordionItem from "../src/lib/components/Accordion/AccordionItem.svelte";

  const { Story } = defineMeta({
    title: "Basic/Accordion",
    component: Accordion,
    subcomponents: { AccordionItem },
    argTypes: {
      allowMultiple: { control: "boolean" },
      bordered: { control: "boolean" },
      defaultExpanded: { control: "number" },
    },
  });
</script>

<Story
  name="Default"
  args={{ defaultExpanded: 0, bordered: true }}
  play={async ({ canvas }) => {
    // Accordion uses <details>/<summary> — first item is expanded by default.
    const summary = canvas.getByText("What is Twintrinsic?");
    await expect(summary).toBeInTheDocument();
    // The first item's content should be visible (expanded by default).
    await expect(canvas.getByText(/Twintrinsic is a Tailwind-based/)).toBeVisible();
  }}
>
  <Accordion defaultExpanded={0} bordered={true}>
     <AccordionItem>
      {#snippet header()}What is Twintrinsic?{/snippet}
      <p>
        Twintrinsic is a Tailwind-based Svelte 5 component library emphasizing
        accessibility, extensibility, and performance through semantic HTML and
        CSS-first approaches.
      </p>
    </AccordionItem>
    <AccordionItem>
      {#snippet header()}How do I use it?{/snippet}
      <p>
        Simply import the components you need and use them in your Svelte
        applications. All components are fully typed with TypeScript and support
        modern Svelte 5 runes.
      </p>
    </AccordionItem>
    <AccordionItem>
      {#snippet header()}Is it accessible?{/snippet}
      <p>
        Yes! All components are WCAG 2.1 compliant with proper ARIA labels,
        semantic HTML, and full keyboard navigation support.
      </p>
    </AccordionItem>
  </Accordion>
</Story>

<Story name="Multiple Items Expanded" args={{ allowMultiple: true, bordered: true }}>
  <Accordion allowMultiple={true} bordered={true}>
    <AccordionItem>
      {#snippet header()}How does the free trial work?{/snippet}
      <p>
        Every new workspace starts with a 14-day free trial of the Pro plan. You
        won't be charged until the trial ends, and you can cancel at any time.
      </p>
    </AccordionItem>
    <AccordionItem>
      {#snippet header()}When will I be billed?{/snippet}
      <p>
        You'll be billed on the same day each month, starting on the day your
        trial converts. Invoices are emailed to your billing contact and available
        in your workspace settings.
      </p>
    </AccordionItem>
    <AccordionItem>
      {#snippet header()}Can I change plans later?{/snippet}
      <p>
        Yes — upgrades take effect immediately and you're charged a prorated
        amount. Downgrades take effect at the start of the next billing cycle.
      </p>
    </AccordionItem>
  </Accordion>
</Story>

<Story name="No Border" args={{ bordered: false, defaultExpanded: 0 }}>
  <Accordion bordered={false} defaultExpanded={0}>
    <AccordionItem>
      {#snippet header()}Company information{/snippet}
      <p>
        Acme Inc. was founded in 2012 and now serves over 4,000 customers across
        30 countries with a team of 120 engineers and designers.
      </p>
    </AccordionItem>
    <AccordionItem>
      {#snippet header()}Contact details{/snippet}
      <p>
        Our support team is available Monday–Friday, 9am–6pm ET. You can reach us
        at support@acme.example or through the in-app chat widget.
      </p>
    </AccordionItem>
    <AccordionItem>
      {#snippet header()}Security and compliance{/snippet}
      <p>
        We are SOC 2 Type II certified and GDPR compliant. All data is encrypted
        in transit and at rest.
      </p>
    </AccordionItem>
  </Accordion>
</Story>

<Story name="All Items Collapsed" args={{ defaultExpanded: null, bordered: true }}>
  <Accordion defaultExpanded={null} bordered={true}>
    <AccordionItem>
      {#snippet header()}What's included in the Basic plan?{/snippet}
      <p>
        The Basic plan includes up to 3 projects, 5 GB of storage, and unlimited
        read-only collaborators. It's free forever for personal use.
      </p>
    </AccordionItem>
    <AccordionItem>
      {#snippet header()}Do you offer discounts for teams?{/snippet}
      <p>
        Yes, teams of 10 or more get 20% off the Pro plan, and non-profits and
        students can apply for a 50% discount.
      </p>
    </AccordionItem>
    <AccordionItem>
      {#snippet header()}Can I export my data?{/snippet}
      <p>
        Absolutely. You can export all of your projects, files, and settings as a
        zip archive from the settings page at any time.
      </p>
    </AccordionItem>
  </Accordion>
</Story>
