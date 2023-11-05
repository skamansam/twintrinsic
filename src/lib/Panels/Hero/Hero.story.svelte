<script lang="ts">
  import type { Hst as Histoire} from '@histoire/plugin-svelte';
  export let Hst: Histoire;
  import Hero from './Hero.svelte';

  let heading = 'This is a HERO!';
  let slotContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel est nemo fugiat delectus perferendis adipisci maiores optio cupiditate hic ipsam dignissimos in quasi ea, minima, ut, reprehenderit quos tempora inventore.';
</script>

<Hst.Story title="Panels/Hero" layout={{ type: 'grid', width: '100%' }} icon='tabler:section'>
  <svelte:fragment slot="controls">
    <Hst.Text bind:value={heading} title="Heading" />
    <Hst.Text bind:value={slotContent} title="slotContent" />
  </svelte:fragment>

  <Hst.Variant title="Default Slot" source="<Hero>&#123;slotContent}</Hero>">
    <Hero>{slotContent}</Hero>
  </Hst.Variant>

  <Hst.Variant title="With Heading" source="<Hero heading='This is a HERO'>&#123;slotContent}</Hero>">
    <Hero {heading}>
      {slotContent}
    </Hero>
  </Hst.Variant>

  <Hst.Variant title="Success" source="<Hero type='success'>&#123;slotContent}</Hero>">
    <Hero type="success">{slotContent}</Hero>
  </Hst.Variant>

  <Hst.Variant title="Info" source="<Hero type='info'>&#123;slotContent}</Hero>">
    <Hero type="info">{slotContent}</Hero>
  </Hst.Variant>

  <Hst.Variant title="Warning" source="<Hero type='warning'>&#123;slotContent}</Hero>">
    <Hero type="warning">{slotContent}</Hero>
  </Hst.Variant>

  <Hst.Variant title="Failure" source="<Hero type='failure'>&#123;slotContent}</Hero>">
    <Hero type="failure">{slotContent}</Hero>
  </Hst.Variant>

  <Hst.Variant title="Danger" source="<Hero type='danger'>&#123;slotContent}</Hero>">
    <Hero type="danger">{slotContent}</Hero>
  </Hst.Variant>

</Hst.Story>
