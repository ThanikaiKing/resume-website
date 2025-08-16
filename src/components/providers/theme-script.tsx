export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          try {
            var theme = localStorage.getItem('resume-site-theme');
            var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            
            if (theme === 'system' || !theme) {
              document.documentElement.classList.add(systemTheme);
            } else {
              document.documentElement.classList.add(theme);
            }
          } catch (e) {}
        `,
      }}
    />
  );
}
