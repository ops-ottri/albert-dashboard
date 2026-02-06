# Albert's Task Dashboard

A beautiful, self-contained kanban-style dashboard for tracking tasks across three columns: Done, Planned, and Ideas.

## Features

- ✅ **Three Columns**: Done, Planned, Ideas
- 📅 **Date Filtering**: Filter tasks by Today, This Week, This Month, This Year, or All Time
- 🎨 **Ottri Branding**: Uses primary brand color #3b2179 (purple)
- 💾 **Persistent Storage**: All tasks are saved to browser localStorage
- 🖱️ **Drag & Drop**: Move tasks between columns with drag-and-drop
- 📱 **Responsive Design**: Works on desktop and mobile
- ⚡ **Zero Dependencies**: Single HTML file with embedded CSS/JS

## Running the Dashboard

### Option 1: Python (Recommended)

```bash
cd /Users/claudebot/.openclaw/workspace/dashboard
python3 -m http.server 8080
```

Then open: http://localhost:8080

### Option 2: Node.js

```bash
cd /Users/claudebot/.openclaw/workspace/dashboard
npx serve -p 8080
```

Then open: http://localhost:8080

### Option 3: Direct File

Simply double-click `index.html` or open it in your browser. Works perfectly, but localhost is recommended for best experience.

## Initial Seed Data

The dashboard comes pre-loaded with 10 tasks documenting today's setup work:

**Done (5 tasks):**
- Set up Albert dashboard project structure
- Created kanban board with three columns
- Implemented date filtering
- Added drag-and-drop functionality
- Set up persistent storage with localStorage

**Planned (2 tasks):**
- Integrate dashboard with Ottri platform monitoring
- Add automated task creation from project context files

**Ideas (3 tasks):**
- Build analytics view showing task completion trends
- Add task priority levels and sorting
- Export tasks to markdown for memory files

## Usage

### Adding Tasks
1. Click the "+ Add Task" button
2. Enter task description
3. Select column (Done, Planned, or Ideas)
4. Click "Add Task"

### Moving Tasks
- Drag any card and drop it into another column
- Tasks automatically save their new status

### Filtering by Date
- Click filter buttons at the top: Today, This Week, This Month, This Year, or All Time
- Counts update automatically

### Deleting Tasks
- Click the "Delete" button on any card
- Confirm the deletion

## Data Persistence

- All tasks are stored in browser localStorage
- Data persists across browser sessions
- No backend server required
- Data is specific to the browser/device used

## Technical Details

- **File Size**: Single ~22KB HTML file
- **Storage**: Browser localStorage (typically 5-10MB available)
- **Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Performance**: Handles hundreds of tasks easily

## Customization

The dashboard is fully self-contained. To customize:

1. Open `index.html` in a text editor
2. Modify colors in the `<style>` section
3. Adjust layouts in the CSS
4. Extend functionality in the `<script>` section

## Troubleshooting

**Tasks not persisting?**
- Check that localStorage is enabled in your browser
- Try using http://localhost instead of file:// protocol

**Drag and drop not working?**
- Ensure you're using a modern browser
- Try refreshing the page

**Styling issues?**
- Clear browser cache
- Ensure JavaScript is enabled

---

Built with ❤️ for Albert, Ottri's AI Chief of Staff
