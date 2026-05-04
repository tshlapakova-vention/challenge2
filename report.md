# Task Report

## Approach
I built the leaderboard as a static web application using plain HTML, CSS, and JavaScript to match the reference screenshot as closely as possible.

### Tools and techniques
- HTML for the exact structure: title area, filter/search toolbar, top-3 podium section, and ranked list rows.
- CSS for visual parity: spacing, colors, rounded borders, podium blocks, score pills, and responsive behavior for smaller screens.
- JavaScript for required functionality:
  - Filter by year, quarter, and category.
  - Search employees by full name and position.
  - Sort by total points using the TOTAL control.
  - Automatically refresh the top-3 podium based on current filtered/sorted data.

## Data replacement process
The screenshot had redacted regions for names, job positions, and profile photos.
I replaced all redacted data with realistic fake values:
- Fake names: Ethan Brooks, Olivia Martinez, Noah Bennett.
- Fake positions: Product Designer, Frontend Developer, Data Analyst.
- Fake photos: locally generated SVG avatar illustrations in assets/avatar1.svg, assets/avatar2.svg, assets/avatar3.svg.

This keeps the UI complete and functional while avoiding real personal data.
