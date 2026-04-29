
/**
 * popup informasi di mana terjadi  trabrakan
 */
export function PopupEffectCrash(x: number, y: number, time: number): string {
  const popup = document.querySelector("div.popupCrash") as HTMLDialogElement;

  popup.style.left = x + "px";
  popup.style.top = y + "px";

  popup.style.display = "block";

  setTimeout((popup.style.display = "none"), time);
}

export function popupOverlay(text: string): string {
  return `
<div id="popup-container" class="overlay">
      <div class="popup-box">
        <div class="popup-content">
          <p>${text}</p>
        </div>
        <button class="close-btn" onclick="document.getElementById('popup-container').remove()">
          Tutup
        </button>
      </div>
    </div>
`;
}
