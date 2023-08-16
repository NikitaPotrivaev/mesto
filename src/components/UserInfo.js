export class UserInfo {
   constructor({ nameInfo, descriptionInfo, avatarItem }) {
      this._nameInfo = document.querySelector(nameInfo);
      this._descriptionInfo = document.querySelector(descriptionInfo);
      this._avatar = document.querySelector(avatarItem);
   }

   getUserInfo() {
      return {
         name: this._nameInfo.textContent,
         description: this._descriptionInfo.textContent,
      }
   }

   setUserInfo({ name, description }) {
      this._nameInfo.textContent = name;
      this._descriptionInfo.textContent = description;
   }

   setAvatar(avatar) {
      this._avatar.src = avatar;
   }
}