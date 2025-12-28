<!--
@component
Calendar - A date picker component with month navigation, range selection,
and keyboard controls. Built with accessibility in mind.

Usage:
```svelte
<Calendar
  value={selectedDate}
  onselect={handleSelect}
/>

<Calendar
  value={dateRange}
  range={true}
  minDate={minDate}
  maxDate={maxDate}
  onselect={handleRangeSelect}
/>
```
-->
<script>
import { createEventDispatcher } from "svelte"
import { slide } from "svelte/transition"
import { clickOutside } from "$lib/actions"
import Input from "./Input.svelte"

const dispatch = createEventDispatcher()

const {
  /** @type {Date | [Date, Date] | null} - Selected date or date range */
  value = null,
  /** @type {boolean} - Whether to allow range selection */
  range = false,
  /** @type {Date | null} - Minimum selectable date */
  minDate = null,
  /** @type {Date | null} - Maximum selectable date */
  maxDate = null,
  /** @type {boolean} - Whether to show week numbers */
  showWeekNumbers = false,
  /** @type {string[]} - Custom day names */
  dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  /** @type {string[]} - Custom month names */
  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  /** @type {string} - Input label */
  label = "Date",
  /** @type {string} - Date format for display */
  format = "MM/dd/yyyy",
  /** @type {boolean} - Whether the calendar is disabled */
  disabled = false,
  /** @type {string} - Additional CSS classes */
  class: className = "",
} = $props()

let showCalendar = $state(false)
let currentMonth = $state(new Date())
let hoverDate = $state(null)
let inputValue = $state("")
let startDate = $state(null)
let endDate = $state(null)
let calendarElement = $state()

// Initialize dates from value prop
$effect(() => {
  if (value) {
    if (range && Array.isArray(value)) {
      ;[startDate, endDate] = value
      currentMonth = new Date(startDate)
    } else if (!range && value instanceof Date) {
      startDate = value
      currentMonth = new Date(value)
    }
    updateInputValue()
  }
})

// Get days in month matrix
function getDaysInMonth(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days = []
  let week = []

  // Fill in leading empty cells
  for (let i = 0; i < firstDay.getDay(); i++) {
    week.push(null)
  }

  // Fill in days
  for (let day = 1; day <= lastDay.getDate(); day++) {
    if (week.length === 7) {
      days.push(week)
      week = []
    }
    week.push(new Date(year, month, day))
  }

  // Fill in trailing empty cells
  while (week.length < 7) {
    week.push(null)
  }
  days.push(week)

  return days
}

// Get week number
function getWeekNumber(date) {
  const target = new Date(date.valueOf())
  const dayNr = (date.getDay() + 6) % 7
  target.setDate(target.getDate() - dayNr + 3)
  const firstThursday = target.valueOf()
  target.setMonth(0, 1)
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7))
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000)
}

// Format date for display
function formatDate(date) {
  if (!date) return ""

  return format
    .replace("MM", String(date.getMonth() + 1).padStart(2, "0"))
    .replace("dd", String(date.getDate()).padStart(2, "0"))
    .replace("yyyy", date.getFullYear())
}

// Update input value based on selected dates
function updateInputValue() {
  if (range) {
    inputValue = startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : ""
  } else {
    inputValue = startDate ? formatDate(startDate) : ""
  }
}

// Handle date selection
function handleDateSelect(date) {
  if (disabled) return

  if (range) {
    if (!startDate || (startDate && endDate) || date < startDate) {
      startDate = date
      endDate = null
    } else {
      endDate = date
      showCalendar = false
    }

    dispatch("select", { start: startDate, end: endDate })
  } else {
    startDate = date
    showCalendar = false
    dispatch("select", { date })
  }

  updateInputValue()
}

// Handle date hover for range selection
function handleDateHover(date) {
  if (range && startDate && !endDate) {
    hoverDate = date
  }
}

// Check if date is in range
function isInRange(date) {
  if (!date) return false
  if (range) {
    if (startDate && !endDate && hoverDate) {
      return date >= startDate && date <= hoverDate
    }
    return startDate && endDate && date >= startDate && date <= endDate
  }
  return false
}

// Check if date is selected
function isSelected(date) {
  if (!date) return false
  if (range) {
    return (
      (startDate && date.getTime() === startDate.getTime()) ||
      (endDate && date.getTime() === endDate.getTime())
    )
  }
  return startDate && date.getTime() === startDate.getTime()
}

// Check if date is disabled
function isDisabled(date) {
  if (!date) return true
  if (minDate && date < minDate) return true
  if (maxDate && date > maxDate) return true
  return false
}

// Navigate to previous/next month
function navigateMonth(delta) {
  const newMonth = new Date(currentMonth)
  newMonth.setMonth(newMonth.getMonth() + delta)
  currentMonth = newMonth
}

// Handle keyboard navigation
function handleKeydown(event) {
  if (!showCalendar) return

  const key = event.key
  const newDate = new Date(currentMonth)

  switch (key) {
    case "ArrowLeft":
      event.preventDefault()
      newDate.setDate(newDate.getDate() - 1)
      break
    case "ArrowRight":
      event.preventDefault()
      newDate.setDate(newDate.getDate() + 1)
      break
    case "ArrowUp":
      event.preventDefault()
      newDate.setDate(newDate.getDate() - 7)
      break
    case "ArrowDown":
      event.preventDefault()
      newDate.setDate(newDate.getDate() + 7)
      break
    case "Enter":
      event.preventDefault()
      handleDateSelect(currentMonth)
      break
    case "Escape":
      event.preventDefault()
      showCalendar = false
      break
    default:
      return
  }

  if (!isDisabled(newDate)) {
    currentMonth = newDate
  }
}
</script>

<div
  class="calendar-container {className}"
  use:clickOutside
  onclickOutside={() => showCalendar = false}
>
  <Input
    {label}
    {disabled}
    value={inputValue}
    readonly
    rightIcon="calendar"
    onclick={() => showCalendar = !showCalendar}
    onrightIconClick={() => showCalendar = !showCalendar}
  />
  
  {#if showCalendar}
    <div
      class="calendar"
      role="dialog"
      aria-label="Calendar"
      transition:slide={{ duration: 150 }}
      onkeydown={handleKeydown}
    >
      <div class="calendar-header">
        <button
          type="button"
          class="calendar-nav-btn"
          onclick={() => navigateMonth(-1)}
          aria-label="Previous month"
          disabled={disabled}
        >
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" />
          </svg>
        </button>
        
        <div class="calendar-title">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        
        <button
          type="button"
          class="calendar-nav-btn"
          onclick={() => navigateMonth(1)}
          aria-label="Next month"
          disabled={disabled}
        >
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
          </svg>
        </button>
      </div>
      
      <table class="calendar-grid" role="grid">
        <thead>
          <tr>
            {#if showWeekNumbers}
              <th scope="col">Wk</th>
            {/if}
            {#each dayNames as day}
              <th scope="col">{day}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each getDaysInMonth(currentMonth) as week}
            <tr>
              {#if showWeekNumbers}
                <td class="calendar-week">
                  {#if week[0]}
                    {getWeekNumber(week[0])}
                  {/if}
                </td>
              {/if}
              {#each week as day}
                <td
                  class="calendar-day"
                  class:calendar-day-selected={isSelected(day)}
                  class:calendar-day-in-range={isInRange(day)}
                  class:calendar-day-disabled={isDisabled(day)}
                >
                  {#if day}
                    <button
                      type="button"
                      disabled={isDisabled(day)}
                      onclick={() => handleDateSelect(day)}
                      onmouseenter={() => handleDateHover(day)}
                      aria-label={formatDate(day)}
                      aria-selected={isSelected(day)}
                    >
                      {day.getDate()}
                    </button>
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "../../twintrinsic.css";

  .calendar-container {
    @apply relative inline-block w-full;
  }

  .calendar {
    @apply absolute z-50 mt-1 p-4;
    @apply bg-surface border border-border rounded-md shadow-lg;
    @apply min-w-[280px];
  }

  .calendar-header {
    @apply flex items-center justify-between mb-4;
  }

  .calendar-title {
    @apply text-sm font-medium;
  }

  .calendar-nav-btn {
    @apply p-1 rounded-md;
    @apply hover:bg-hover focus:bg-hover;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .calendar-grid {
    @apply w-full border-collapse;
  }

  .calendar-grid th {
    @apply p-1 text-xs font-medium text-muted text-center;
  }

  .calendar-week {
    @apply p-1 text-xs text-muted text-center;
  }

  .calendar-day {
    @apply p-0 text-center;
  }

  .calendar-day button {
    @apply w-8 h-8 rounded-md text-sm;
    @apply hover:bg-hover focus:bg-hover;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .calendar-day-selected button {
    @apply bg-primary text-primary-text;
    @apply hover:bg-primary-hover focus:bg-primary-hover;
  }

  .calendar-day-in-range {
    @apply bg-primary-50 dark:bg-primary-900;
  }

  .calendar-day-disabled button {
    @apply opacity-50 cursor-not-allowed;
    @apply hover:bg-transparent focus:bg-transparent;
  }
</style>
