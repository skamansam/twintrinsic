import { Icon } from "../lib/components/Icon"

export default {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    name: {
      control: "select",
      options: [
        // Interface
        "check",
        "close",
        "plus",
        "minus",
        "search",
        "settings",
        "menu",
        "more",
        // Navigation
        "arrow-left",
        "arrow-right",
        "arrow-up",
        "arrow-down",
        "chevron-left",
        "chevron-right",
        "chevron-up",
        "chevron-down",
        // Actions
        "edit",
        "delete",
        "save",
        "refresh",
        "download",
        "upload",
        "copy",
        // Forms
        "calendar",
        "eye",
        "eye-off",
        "lock",
        "unlock",
        // Media
        "play",
        "pause",
        "stop",
        "volume-up",
        "volume-down",
        "volume-mute",
        "volume-off",
        // Status
        "info",
        "warning",
        "error",
        "success",
        "help",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
}

// Basic icon
export const Basic = {
  args: {
    name: "check",
    size: "md",
  },
}

// All sizes
export const Sizes = {
  render: () => ({
    Component: Icon,
    slots: {
      default: `
        <div class="flex items-center gap-4">
          <Icon name="check" size="sm" />
          <Icon name="check" size="md" />
          <Icon name="check" size="lg" />
          <Icon name="check" size="xl" />
        </div>
      `,
    },
  }),
}

// Interface icons
export const Interface = {
  render: () => ({
    Component: Icon,
    slots: {
      default: `
        <div class="grid grid-cols-4 gap-4">
          <div class="flex flex-col items-center gap-2">
            <Icon name="check" />
            <span class="text-sm">check</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="close" />
            <span class="text-sm">close</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="plus" />
            <span class="text-sm">plus</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="minus" />
            <span class="text-sm">minus</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="search" />
            <span class="text-sm">search</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="settings" />
            <span class="text-sm">settings</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="menu" />
            <span class="text-sm">menu</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="more" />
            <span class="text-sm">more</span>
          </div>
        </div>
      `,
    },
  }),
}

// Navigation icons
export const Navigation = {
  render: () => ({
    Component: Icon,
    slots: {
      default: `
        <div class="grid grid-cols-4 gap-4">
          <div class="flex flex-col items-center gap-2">
            <Icon name="arrow-left" />
            <span class="text-sm">arrow-left</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="arrow-right" />
            <span class="text-sm">arrow-right</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="arrow-up" />
            <span class="text-sm">arrow-up</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="arrow-down" />
            <span class="text-sm">arrow-down</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="chevron-left" />
            <span class="text-sm">chevron-left</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="chevron-right" />
            <span class="text-sm">chevron-right</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="chevron-up" />
            <span class="text-sm">chevron-up</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="chevron-down" />
            <span class="text-sm">chevron-down</span>
          </div>
        </div>
      `,
    },
  }),
}

// Action icons
export const Actions = {
  render: () => ({
    Component: Icon,
    slots: {
      default: `
        <div class="grid grid-cols-4 gap-4">
          <div class="flex flex-col items-center gap-2">
            <Icon name="edit" />
            <span class="text-sm">edit</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="delete" />
            <span class="text-sm">delete</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="save" />
            <span class="text-sm">save</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="refresh" />
            <span class="text-sm">refresh</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="download" />
            <span class="text-sm">download</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="upload" />
            <span class="text-sm">upload</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="copy" />
            <span class="text-sm">copy</span>
          </div>
        </div>
      `,
    },
  }),
}

// Form icons
export const Forms = {
  render: () => ({
    Component: Icon,
    slots: {
      default: `
        <div class="grid grid-cols-4 gap-4">
          <div class="flex flex-col items-center gap-2">
            <Icon name="calendar" />
            <span class="text-sm">calendar</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="eye" />
            <span class="text-sm">eye</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="eye-off" />
            <span class="text-sm">eye-off</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="lock" />
            <span class="text-sm">lock</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="unlock" />
            <span class="text-sm">unlock</span>
          </div>
        </div>
      `,
    },
  }),
}

// Media icons
export const Media = {
  render: () => ({
    Component: Icon,
    slots: {
      default: `
        <div class="grid grid-cols-4 gap-4">
          <div class="flex flex-col items-center gap-2">
            <Icon name="play" />
            <span class="text-sm">play</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="pause" />
            <span class="text-sm">pause</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="stop" />
            <span class="text-sm">stop</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="volume-up" />
            <span class="text-sm">volume-up</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="volume-down" />
            <span class="text-sm">volume-down</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="volume-mute" />
            <span class="text-sm">volume-mute</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="volume-off" />
            <span class="text-sm">volume-off</span>
          </div>
        </div>
      `,
    },
  }),
}

// Status icons
export const Status = {
  render: () => ({
    Component: Icon,
    slots: {
      default: `
        <div class="grid grid-cols-4 gap-4">
          <div class="flex flex-col items-center gap-2">
            <Icon name="info" class="text-info" />
            <span class="text-sm">info</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="warning" class="text-warning" />
            <span class="text-sm">warning</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="error" class="text-error" />
            <span class="text-sm">error</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="success" class="text-success" />
            <span class="text-sm">success</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Icon name="help" class="text-info" />
            <span class="text-sm">help</span>
          </div>
        </div>
      `,
    },
  }),
}
