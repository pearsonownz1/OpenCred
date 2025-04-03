export function smoothScrollTo(elementId: string) {
    const element = document.getElementById(elementId)
    if (!element) return
  
    window.scrollTo({
      top: element.offsetTop - 80, // Offset for the navbar
      behavior: "smooth",
    })
  }
  
  