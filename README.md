# Franklin's Student Portfolio

A clean, modern, and easy-to-update portfolio template designed for student lab applications.

## 🚀 Features

- **Clean Design**: Minimalist and professional layout
- **Easy to Update**: Simple HTML structure with clearly marked sections
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **No Framework Required**: Pure HTML, CSS, and JavaScript
- **Fast**: Lightweight and optimized for performance
- **Modern**: Smooth animations and transitions

## 📁 Files Overview

- `index.html` - Main portfolio page (edit your information here)
- `styles.css` - All styling and responsive design
- `script.js` - Smooth scrolling and animations
- `README.md` - This file

## 🛠️ How to Update Your Portfolio

### 1. **Personal Information**

Open `index.html` and find these sections:

#### Header/Navigation
```html
<div class="nav-logo">Franklin Fucab</div>
```
Change "Franklin Fucab" to your name.

#### Hero Section
```html
<h1>Hi, I'm Franklin Fucab</h1>
<p class="tagline">Student Developer | Problem Solver | Lab Enthusiast</p>
```
Update with your name and tagline.

#### About Section
```html
<div class="about-item">
    <h3>🎓 Education</h3>
    <p>Currently pursuing [Your Degree/Program]</p>
</div>
```
Fill in:
- Your degree/program
- Your lab focus area
- Your interests

### 2. **Add Your Projects**

Projects are in the "Projects" section. Each project follows this template:

```html
<div class="project-card">
    <div class="project-header">
        <h3>Project Title 1</h3>
        <p class="project-date">2024</p>
    </div>
    <p class="project-description">
        Brief description of your project...
    </p>
    <div class="project-tags">
        <span class="tag">Technology 1</span>
        <span class="tag">Technology 2</span>
    </div>
    <a href="#" class="project-link">View Project →</a>
</div>
```

**To add a new project:**
1. Copy the entire `<div class="project-card">...</div>` block
2. Paste it in the projects grid
3. Update:
   - `Project Title 1` → Your project name
   - `2024` → Project year
   - Description text
   - Tags (technologies used)
   - `href="#"` → Link to your project (GitHub repo, live site, etc.)

**To remove a project:**
- Simply delete the entire `<div class="project-card">...</div>` block

### 3. **Update Skills**

Skills are organized by category. Edit the skills section:

```html
<div class="skill-category">
    <h3>Languages</h3>
    <ul>
        <li>JavaScript</li>
        <li>Python</li>
        <li>HTML/CSS</li>
    </ul>
</div>
```

Add/remove `<li>` items to update your skills.

### 4. **Contact Information**

Update the Contact section:

```html
<a href="mailto:your.email@example.com" class="contact-button">📧 Email Me</a>
<a href="https://github.com/franklinfucab-bit" class="contact-button">🐙 GitHub</a>
<a href="https://linkedin.com/in/yourprofile" class="contact-button">💼 LinkedIn</a>
```

Replace with your actual email, GitHub URL, LinkedIn profile, etc.

### 5. **Footer**

Update the copyright year if needed:

```html
<p>&copy; 2024 Franklin Fucab. All rights reserved.</p>
```

## 🎨 Customization

### Change Colors

Open `styles.css` and look for the `:root` section at the top:

```css
:root {
    --primary-color: #2563eb;      /* Main blue color */
    --secondary-color: #1e40af;    /* Darker blue */
    --text-dark: #1f2937;          /* Dark text */
    --text-light: #6b7280;         /* Light gray text */
    --bg-light: #f9fafb;           /* Light background */
    --bg-white: #ffffff;           /* White background */
}
```

Change any hex color codes to your preferred colors.

### Change Fonts

In `styles.css`, modify the font family:

```css
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...
}
```

Or import from Google Fonts at the top of the HTML file.

## 📱 Responsive Design

The portfolio automatically adapts to:
- **Desktop** (1200px+): Full layout
- **Tablet** (768px - 1199px): Adjusted grid
- **Mobile** (< 768px): Single column layout

## 🚀 Deployment

### Option 1: GitHub Pages (Free & Easy)

1. Go to your repository settings
2. Scroll to "GitHub Pages"
3. Select main branch as source
4. Your portfolio will be live at: `https://franklinfucab-bit.github.io/portfolio/`

### Option 2: Netlify (Free & Recommended)

1. Sign up at [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Netlify will auto-deploy on every push

### Option 3: Vercel (Free)

1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Auto-deploys on git push

## 📝 Quick Checklist

- [ ] Update name in header and hero section
- [ ] Add/edit about information
- [ ] Add at least 3 projects with descriptions
- [ ] Update skills list
- [ ] Add correct email and social links
- [ ] Test on mobile/tablet
- [ ] Deploy to GitHub Pages or hosting platform

## 🎯 Tips for Lab Applications

1. **Be Specific**: Describe what each project does, not just the technologies
2. **Show Impact**: Mention results or lessons learned
3. **Keep It Updated**: Add new projects regularly
4. **Use Relevant Technologies**: Highlight skills matching lab requirements
5. **Professional Contact**: Use a professional email address
6. **Mobile Friendly**: Reviewers often use phones - test thoroughly

## 📚 Next Steps

- Add project GitHub links
- Create a `/projects` folder with detailed project pages
- Add a blog section if desired
- Implement a contact form (requires backend)
- Add PDF resume download link

## ❓ Questions?

Check the code comments in `index.html` for specific section explanations. Everything is well-documented!

---

**Happy portfolio building! Good luck with your lab applications!** 🚀
