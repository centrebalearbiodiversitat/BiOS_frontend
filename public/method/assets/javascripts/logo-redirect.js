const TARGET_URL = '/en'; // <- change to the URL you want
const TARGET_BLANK = true; // set false if you want same tab

function setLogoLink() {

    let el = document.querySelector('a[href="index.html"][title]');

    if (!el) return false;

    try {
      el.setAttribute('href', TARGET_URL);
      if (TARGET_BLANK) el.setAttribute('target', '_blank');
      // optionally allow noreferrer
      el.setAttribute('rel', 'noopener noreferrer');
      return true;
    } catch (e) {
      console.warn('Failed to set logo link', e);
      return false;
    }
}

document$.subscribe(() => {
  setLogoLink()

});