export class UserInfo {
   constructor({ nameInfo, descriptionInfo }) {
      this._nameInfo = nameInfo;
      this._descriptionInfo = descriptionInfo;
   }

   getUserInfo() {
      return {
         name: this._nameInfo.textContent,
         description: this._descriptionInfo.textContent
      }
   }

   setUserInfo({ name, description }) {
      this._nameInfo.textContent = name;
      this._descriptionInfo.textContent = description;
   }
}