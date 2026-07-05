import { ReferenceLaw } from '../types';

export const PSYCHOLOGY_LAWS: ReferenceLaw[] = [
  {
    name: "Fitts's Law",
    definition: "The time to acquire a target is a function of the distance to and size of the target.",
    origin: "Paul Fitts, 1954",
    example: "Large, floating action buttons (CTAs) positioned within easy reach of a thumb on mobile screens, or generous click targets for checkboxes.",
    practicalTips: [
      "Keep primary target sizes at least 44x44px (iOS) or 48x48px (Android/Web).",
      "Position crucial actions close to the user's natural scanning/resting paths.",
      "Provide generous spacing around small buttons to avoid accidental adjacent clicks."
    ]
  },
  {
    name: "Hick's Law",
    definition: "The time it takes to make a decision increases with the number and complexity of choices.",
    origin: "William Edmund Hick and Ray Hyman, 1952",
    example: "Standard multi-step onboarding wizard instead of one massive page of inputs, or collapsed filter categories.",
    practicalTips: [
      "De-clutter screens by hiding secondary options under expandable menus or progressive disclosures.",
      "Highlight a single 'Primary Action' per section to direct user attention.",
      "Categorize complex tables/lists to reduce initial processing burden."
    ]
  },
  {
    name: "Jakob's Law",
    definition: "Users spend most of their time on other websites. This means users prefer your site to work the same way as all the other sites they already know.",
    origin: "Jakob Nielsen, 2000",
    example: "Placing the shopping cart icon at the top right, or using a classic horizontal header with the logo at the top left linking to the home page.",
    practicalTips: [
      "Avoid reinventing well-established interactive patterns unless testing proves a significant benefit.",
      "Use common iconography (e.g. magnifying glass for search, cog for settings).",
      "Structure forms and checkout processes linearly, resembling industry standards."
    ]
  },
  {
    name: "Miller's Law",
    definition: "The average person can only keep 7 (plus or minus 2) items in their working memory.",
    origin: "George Miller, 1956",
    example: "Grouping phone numbers into chunks (e.g., +1 555-019-2831) rather than a single string, or dividing navigation menus into small logical clusters.",
    practicalTips: [
      "Organize content into distinct, digestible modules or buckets.",
      "Limit header menu top-level options to 5–7 items maximum.",
      "Use cards or visual borders to isolate distinct groups of data."
    ]
  },
  {
    name: "Aesthetic-Usability Effect",
    definition: "Users often perceive aesthetically pleasing design as design that's more usable.",
    origin: "Kurosu and Kashimura, 1995",
    example: "Users being highly forgiving of minor speed or layout bugs because an app features gorgeous typography, balanced whitespace, and luxurious micro-animations.",
    practicalTips: [
      "Invest in micro-interactions, responsive hover transitions, and visual polish.",
      "Make sure first impressions (landing, empty states) are visually pristine.",
      "Ensure beautiful layouts are backed by solid usability so trust remains intact long-term."
    ]
  },
  {
    name: "Von Restorff Effect (Isolation Effect)",
    definition: "When multiple homogeneous objects are presented, the stimulus that differs from the rest is most likely to be remembered.",
    origin: "Hedwig von Restorff, 1933",
    example: "Using a bright accent color on the 'Sign Up Free' button while keeping secondary actions in plain text or subtle outline states.",
    practicalTips: [
      "Make primary CTAs look distinct from other elements via scale, shape, or color.",
      "Use badging or subtle animations (like a notification dot) to draw focus to new features.",
      "Avoid highlighting everything; if multiple elements scream for attention, none will be remembered."
    ]
  },
  {
    name: "Zeigarnik Effect",
    definition: "People remember uncompleted or interrupted tasks better than completed tasks.",
    origin: "Bluma Zeigarnik, 1927",
    example: "Displaying a 'Profile Complete: 70%' circular progress ring in the dashboard dashboard layout to motivate users to complete the remaining fields.",
    practicalTips: [
      "Provide visual indicators of progress for multi-step tasks (e.g., steppers, checkmarks).",
      "Remind users gently of unfinished drafts, saved items, or cart products.",
      "Create logical milestones that encourage closure without causing fatigue."
    ]
  },
  {
    name: "Doherty Threshold",
    definition: "Productivity soars when a computer and its users interact at a pace (<400ms) that ensures that neither has to wait on the other.",
    origin: "Walter J. Doherty, 1982",
    example: "Using skeleton loaders and instant optimism UI rendering while uploading a file, so the interface feels lightning fast.",
    practicalTips: [
      "Ensure actions register visual feedback under 100ms.",
      "Use loading skeletons or transition animations to bridge processing times.",
      "Provide progressive feedback (percentage circles or incremental text steps) for operations taking longer than 1 second."
    ]
  },
  {
    name: "Serial Position Effect",
    definition: "Users have a tendency to best remember the first and last items in a series.",
    origin: "Hermann Ebbinghaus",
    example: "Placing key navigations like 'Home' and 'Profile' at the absolute beginning and end of a bottom navigation bar.",
    practicalTips: [
      "Put the most important menu items at the extreme left/right or top/bottom of lists.",
      "Structure summary tables so that totals and critical starting indexes are visually salient.",
      "Position your strong hooks at the top of the landing page, and close with a powerful footer CTA."
    ]
  }
];

export const WCAG_CRITERIA = [
  {
    id: "1.4.3",
    level: "AA",
    category: "Contrast (Minimum)",
    requirement: "The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for large text which requires 3:1.",
    howToFix: "Darken the text color or lighten the background. Use tools to verify HEX contrast values."
  },
  {
    id: "2.1.1",
    level: "A",
    category: "Keyboard",
    requirement: "All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.",
    howToFix: "Ensure all buttons, form fields, and menus have proper outline focus indicators and tab-indexes."
  },
  {
    id: "2.5.5",
    level: "AAA",
    category: "Target Size",
    requirement: "The size of the target for pointer inputs is at least 44 by 44 CSS pixels.",
    howToFix: "Increase the padding around active button targets, or increase the size of interactive nodes."
  },
  {
    id: "1.1.1",
    level: "A",
    category: "Non-text Content",
    requirement: "All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.",
    howToFix: "Add meaningful descriptive 'alt' tags to images and illustrative SVGs, or use 'aria-label' attributes."
  }
];
