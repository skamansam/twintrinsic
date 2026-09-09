<script module>
import { defineMeta } from "@storybook/addon-svelte-csf"
import { expect, userEvent } from "storybook/test"
import Timer from "$lib/components/Timer/Timer.svelte"

const { Story } = defineMeta({
  title: "Feedback/Timer",
  component: Timer,
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["countdown", "countup"],
    },
    variant: {
      control: { type: "select" },
      options: ["bar", "gauge", "kpi"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "danger", "warning", "info"],
    },
    duration: { control: "number" },
    size: { control: "number" },
    showControls: { control: "boolean" },
    loop: { control: "boolean" },
    autoStart: { control: "boolean" },
  },
  args: {
    duration: 90,
    autoStart: true,
  },
})
</script>

<Story
  name="Countdown"
  play={async ({ canvas }) => {
    const readout = canvas.getByRole("timer")
    await expect(readout).toBeInTheDocument()
    await expect(readout).toHaveTextContent(/^01:/)
  }}
>
  <Timer duration={90} />
</Story>

<Story name="Count Up" args={{ mode: "countup", duration: 30 }}>
  <Timer mode="countup" duration={30} />
</Story>

<Story name="Gauge" args={{ variant: "gauge", duration: 300, label: "Pomodoro" }}>
  <Timer variant="gauge" duration={300} label="Pomodoro" />
</Story>

<Story name="KPI" args={{ variant: "kpi", duration: 120, label: "Deploy" }}>
  <Timer variant="kpi" duration={120} label="Deploy" />
</Story>

<Story name="Loop" args={{ duration: 10, loop: true }}>
  <Timer duration={10} loop />
</Story>

<Story
  name="Controls"
  play={async ({ canvas }) => {
    const pause = canvas.getByRole("button", { name: "Pause timer" })
    await expect(pause).toBeInTheDocument()
    await userEvent.click(pause)
    await expect(canvas.getByRole("button", { name: "Resume timer" })).toBeInTheDocument()
  }}
>
  <Timer duration={90} />
</Story>

<Story name="Hidden Controls" args={{ showControls: false }}>
  <Timer showControls={false} />
</Story>