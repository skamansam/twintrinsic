<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
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

<Story name="Default" args={{ defaultExpanded: 0, bordered: true }}>
  <Accordion defaultExpanded={0} bordered={true}>
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

<Story name="Billing FAQ" args={{ allowMultiple: true, bordered: true }}>
  <Accordion allowMultiple={true} bordered={true}>
    <AccordionItem>
      <svelte:fragment slot="header">How does the free trial work?</svelte:fragment>
      <p>
        Every new workspace starts with a 14-day free trial of the Pro plan. You
        won't be charged until the trial ends, and you can cancel at any time.
      </p>
    </AccordionItem>
    <AccordionItem>
      <svelte:fragment slot="header">When will I be billed?</svelte:fragment>
      <p>
        You'll be billed on the same day each month, starting on the day your
        trial converts. Invoices are emailed to your billing contact and available
        in your workspace settings.
      </p>
    </AccordionItem>
    <AccordionItem>
      <svelte:fragment slot="header">Can I change plans later?</svelte:fragment>
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
      <svelte:fragment slot="header">Company information</svelte:fragment>
      <p>
        Acme Inc. was founded in 2012 and now serves over 4,000 customers across
        30 countries with a team of 120 engineers and designers.
      </p>
    </AccordionItem>
    <AccordionItem>
      <svelte:fragment slot="header">Contact details</svelte:fragment>
      <p>
        Our support team is available Monday–Friday, 9am–6pm ET. You can reach us
        at support@acme.example or through the in-app chat widget.
      </p>
    </AccordionItem>
    <AccordionItem>
      <svelte:fragment slot="header">Security and compliance</svelte:fragment>
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
      <svelte:fragment slot="header">What's included in the Basic plan?</svelte:fragment>
      <p>
        The Basic plan includes up to 3 projects, 5 GB of storage, and unlimited
        read-only collaborators. It's free forever for personal use.
      </p>
    </AccordionItem>
    <AccordionItem>
      <svelte:fragment slot="header">Do you offer discounts for teams?</svelte:fragment>
      <p>
        Yes, teams of 10 or more get 20% off the Pro plan, and non-profits and
        students can apply for a 50% discount.
      </p>
    </AccordionItem>
    <AccordionItem>
      <svelte:fragment slot="header">Can I export my data?</svelte:fragment>
      <p>
        Absolutely. You can export all of your projects, files, and settings as a
        zip archive from the settings page at any time.
      </p>
    </AccordionItem>
  </Accordion>
</Story>
