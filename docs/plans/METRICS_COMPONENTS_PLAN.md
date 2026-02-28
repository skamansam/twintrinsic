# Metrics Category - Data Display Components Plan

## Overview
Add a comprehensive set of data visualization and metrics components to support dashboard and analytics use cases. These components will be placed under a new `Metrics` category in the component library.

## Components to Implement (12 total)

### Core Chart Components
1. **DonutChart** - Circular chart showing proportional data with center cutout
   - Props: data (array), colors (array), labels (array), title (optional)
   - Events: onsliceclick
   - Features: Hover effects, legend, responsive sizing

2. **PieChart** - Circular chart showing proportional data
   - Props: data (array), colors (array), labels (array), title (optional)
   - Events: onsliceclick
   - Features: Hover effects, legend, responsive sizing

3. **LineChart** - Line graph supporting single and multiple data series
   - Props: data (array of series), labels (array), colors (array), title (optional), yAxisLabel (optional)
   - Events: onpointclick, onseriesclick
   - Features: Multiple series, grid lines, responsive, smooth curves

4. **BarChart** - Vertical bar chart with single/multiple series support
   - Props: data (array of series), labels (array), colors (array), title (optional), yAxisLabel (optional)
   - Events: onbarclick
   - Features: Grouped/stacked modes, responsive, grid lines

5. **HorizontalBarChart** - Horizontal bar chart (better for long labels)
   - Props: data (array), labels (array), colors (array), title (optional), xAxisLabel (optional)
   - Events: onbarclick
   - Features: Responsive, grid lines, label truncation

6. **AreaChart** - Area chart with optional stacking
   - Props: data (array of series), labels (array), colors (array), title (optional), stacked (boolean)
   - Events: onpointclick
   - Features: Multiple series, gradient fills, smooth curves

### Metrics & Stats Components
7. **StatsCard** - Single metric display card
   - Props: label (string), value (string/number), icon (optional), trend (optional), trendValue (optional), color (optional)
   - Events: onclick
   - Features: Icon support, trend indicator (up/down), customizable colors

8. **MetricGrid** - Grid layout for multiple stats cards
   - Props: items (array of StatsCard props), columns (number)
   - Features: Responsive grid, consistent spacing

9. **KPICard** - Key Performance Indicator card with comparison
   - Props: label (string), value (number), target (number), unit (optional), icon (optional), color (optional)
   - Events: onclick
   - Features: Progress indicator, comparison to target, percentage display

10. **GaugeChart** - Circular gauge showing progress/percentage
    - Props: value (number), min (number), max (number), label (optional), unit (optional), color (optional)
    - Features: Animated needle, color zones, responsive

11. **ProgressMetric** - Horizontal progress bar with label and percentage
    - Props: label (string), value (number), max (number), color (optional), showPercentage (boolean)
    - Features: Animated fill, customizable colors, optional percentage display

12. **MetricTrend** - Sparkline-style mini chart showing trend
    - Props: data (array), label (string), color (optional), height (number)
    - Events: onclick
    - Features: Minimal design, responsive, hover tooltip

## Implementation Structure

### Directory Layout
```
src/lib/components/Metrics/
├── DonutChart/
│   ├── DonutChart.svelte
│   └── DonutChart.d.ts
├── PieChart/
│   ├── PieChart.svelte
│   └── PieChart.d.ts
├── LineChart/
│   ├── LineChart.svelte
│   └── LineChart.d.ts
├── BarChart/
│   ├── BarChart.svelte
│   └── BarChart.d.ts
├── HorizontalBarChart/
│   ├── HorizontalBarChart.svelte
│   └── HorizontalBarChart.d.ts
├── AreaChart/
│   ├── AreaChart.svelte
│   └── AreaChart.d.ts
├── StatsCard/
│   ├── StatsCard.svelte
│   └── StatsCard.d.ts
├── MetricGrid/
│   ├── MetricGrid.svelte
│   └── MetricGrid.d.ts
├── KPICard/
│   ├── KPICard.svelte
│   └── KPICard.d.ts
├── GaugeChart/
│   ├── GaugeChart.svelte
│   └── GaugeChart.d.ts
├── ProgressMetric/
│   ├── ProgressMetric.svelte
│   └── ProgressMetric.d.ts
└── MetricTrend/
    ├── MetricTrend.svelte
    └── MetricTrend.d.ts
```

### Testing Structure
```
tests/
├── unit/
│   ├── DonutChart.test.ts
│   ├── PieChart.test.ts
│   ├── LineChart.test.ts
│   ├── BarChart.test.ts
│   ├── HorizontalBarChart.test.ts
│   ├── AreaChart.test.ts
│   ├── StatsCard.test.ts
│   ├── MetricGrid.test.ts
│   ├── KPICard.test.ts
│   ├── GaugeChart.test.ts
│   ├── ProgressMetric.test.ts
│   └── MetricTrend.test.ts
└── e2e/
    ├── DonutChart.test.js
    ├── PieChart.test.js
    ├── LineChart.test.js
    ├── BarChart.test.js
    ├── HorizontalBarChart.test.js
    ├── AreaChart.test.js
    ├── StatsCard.test.js
    ├── MetricGrid.test.js
    ├── KPICard.test.js
    ├── GaugeChart.test.js
    ├── ProgressMetric.test.js
    └── MetricTrend.test.js
```

### Stories Structure
```
stories/
├── DonutChart.stories.ts
├── PieChart.stories.ts
├── LineChart.stories.ts
├── BarChart.stories.ts
├── HorizontalBarChart.stories.ts
├── AreaChart.stories.ts
├── StatsCard.stories.ts
├── MetricGrid.stories.ts
├── KPICard.stories.ts
├── GaugeChart.stories.ts
├── ProgressMetric.stories.ts
└── MetricTrend.stories.ts
```

### Documentation Structure
```
src/routes/docs/components/Metrics/
├── +page.svelte (overview page)
├── DonutChart/
│   └── +page.svelte
├── PieChart/
│   └── +page.svelte
├── LineChart/
│   └── +page.svelte
├── BarChart/
│   └── +page.svelte
├── HorizontalBarChart/
│   └── +page.svelte
├── AreaChart/
│   └── +page.svelte
├── StatsCard/
│   └── +page.svelte
├── MetricGrid/
│   └── +page.svelte
├── KPICard/
│   └── +page.svelte
├── GaugeChart/
│   └── +page.svelte
├── ProgressMetric/
│   └── +page.svelte
└── MetricTrend/
    └── +page.svelte
```

## Implementation Details

### Chart Components (DonutChart, PieChart, LineChart, BarChart, HorizontalBarChart, AreaChart)
- **SVG-based rendering** for performance and scalability
- **No external charting library** - use native SVG with Tailwind styling
- **Responsive design** using viewBox and aspect-ratio utilities
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Callback props** (no event dispatcher) per Svelte 5 migration pattern
- **Color system**: Use Tailwind theme colors with fallback to custom palette
- **Animations**: CSS transitions for smooth interactions

### Stats Components (StatsCard, MetricGrid, KPICard, GaugeChart, ProgressMetric, MetricTrend)
- **Tailwind-based styling** for consistency with design system
- **Icon integration** with existing Icon component
- **Responsive layouts** using Tailwind grid/flex utilities
- **Accessibility**: Semantic HTML, ARIA labels where needed
- **Callback props** for interactions
- **Optional animations** for metric changes

## Implementation Phases

### Phase 1: Foundation & Core Charts (Priority: High)
- [ ] Create Metrics category directory structure
- [ ] Implement DonutChart component
- [ ] Implement PieChart component
- [ ] Implement LineChart component
- [ ] Implement BarChart component
- [ ] Unit tests for all Phase 1 components
- [ ] E2E tests for all Phase 1 components
- [ ] Storybook stories for all Phase 1 components

### Phase 2: Additional Charts & Metrics (Priority: High)
- [ ] Implement HorizontalBarChart component
- [ ] Implement AreaChart component
- [ ] Implement StatsCard component
- [ ] Implement MetricGrid component
- [ ] Unit tests for all Phase 2 components
- [ ] E2E tests for all Phase 2 components
- [ ] Storybook stories for all Phase 2 components

### Phase 3: Advanced Metrics (Priority: Medium)
- [ ] Implement KPICard component
- [ ] Implement GaugeChart component
- [ ] Implement ProgressMetric component
- [ ] Implement MetricTrend component
- [ ] Unit tests for all Phase 3 components
- [ ] E2E tests for all Phase 3 components
- [ ] Storybook stories for all Phase 3 components

### Phase 4: Documentation & Integration (Priority: High)
- [ ] Create Metrics overview documentation page
- [ ] Create individual component documentation pages (all 12)
- [ ] Update README.md with Metrics category and all components
- [ ] Update src/lib/index.ts with all component exports
- [ ] Update completion checklist page
- [ ] Verify all tests pass
- [ ] Verify Storybook builds successfully
- [ ] Verify linting and type checking pass

## Technical Considerations

### SVG Chart Implementation
- Use SVG `<svg>` element with viewBox for responsive scaling
- Calculate dimensions based on data and container size
- Implement proper axis labels and legends
- Add grid lines for readability
- Support both light and dark themes via CSS variables

### Color Palette
- Leverage Tailwind theme colors (primary, secondary, success, danger, warning, info)
- Provide sensible defaults for chart colors
- Allow color customization via props
- Ensure sufficient contrast for accessibility

### Performance
- Avoid re-rendering entire charts on minor updates
- Use Svelte's reactivity efficiently
- Consider lazy loading for complex visualizations
- Optimize SVG rendering for large datasets

### Accessibility
- All charts must have proper ARIA labels
- Support keyboard navigation for interactive elements
- Provide text alternatives for visual data
- Ensure color is not the only way to distinguish data
- Test with screen readers

### Testing Strategy
- **Unit tests**: Component rendering, prop handling, data calculations
- **E2E tests**: User interactions, responsive behavior, accessibility
- **Visual regression**: Use Storybook for visual consistency checks
- **Accessibility**: Automated a11y testing in Playwright

## Dependencies
- No external charting libraries (Chart.js, D3, etc.)
- Leverage existing Twintrinsic components (Icon, Card, etc.)
- Use Tailwind CSS for all styling
- Use Svelte 5 runes for state management

## Success Criteria
- [ ] All 12 components implemented and functional
- [ ] 100% unit test coverage for all components
- [ ] E2E tests covering main user interactions
- [ ] Storybook stories for all components with multiple variants
- [ ] Complete documentation pages for each component
- [ ] README.md updated with Metrics category
- [ ] All tests passing (unit, e2e, type checking, linting)
- [ ] Components accessible (WCAG 2.1 AA compliant)
- [ ] Responsive design verified across breakpoints
- [ ] Dark mode support verified

## Notes
- Keep implementations lightweight and CSS-first
- Follow existing Twintrinsic patterns and conventions
- Maintain consistency with design system
- Prioritize accessibility from the start
- Consider dashboard use cases when designing interactions
