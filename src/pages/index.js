import { FormValidator } from "../components/FormValidator.js";
import { config } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { formProfileElement, nameInput, jobInput, popupProfileOpenButton, popupCardOpenButton, formElementMesto, formAvatarElement, popupAvatarOpenButton } from "../utils/elements.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { WarningPopup } from "../components/WarningPopup.js";
import "../pages/index.css";

const formProfileElementValidator = new FormValidator(config, formProfileElement);
const formElementMestoValidator = new FormValidator(config, formElementMesto);
const formAvatarValidator = new FormValidator(config, formAvatarElement);

formProfileElementValidator.enableValidation();
formElementMestoValidator.enableValidation();
formAvatarValidator.enableValidation();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-73',
  headers: {
     authorization: '5403cc9a-18ac-4747-9d86-0d0aabd9b5d7',
     'Content-Type': 'application/json'
  }
});

let userId = null;

Promise.all([ api.getProfileData(), api.getInitialCards() ])
  .then(([profileData, cardData]) => {
    userInfo.setAvatar(profileData.avatar)
    userId = profileData._id
    userInfo.setUserInfo({ 
      name: profileData.name,
      description: profileData.about,
     })
    cardData.forEach(data => {
     const element = {
        name: data.name,
        link: data.link,
        likes: data.likes,
        cardId: data._id,
        userId: userId,
        ownerId: data.owner._id
      }
      cardsList.setItem(createCard(element))
    })
  })
.catch((err) => console.log(`Возникла глобальная ошибка, ${err}`))

const userInfo = new UserInfo({ 
  nameInfo: '.profile__info-name',
  descriptionInfo: '.profile__info-hobby',
  avatarItem: '.profile__avatar'
});

popupProfileOpenButton.addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  formProfileElementValidator.clearForm();
  nameInput.value = user.name;
  jobInput.value = user.description;
  popupEditProfile.open();
});

const popupEditProfile = new PopupWithForm('#profile-popup', {
  submitForm: (data) => {
    popupEditProfile.showLoading(true)
    api.sendProfileData(data)
      .then(res => {
        userInfo.setUserInfo({ 
          name: res.name,
          description: res.about
        })
        popupEditProfile.close();
      })
      .catch(err => console.log(`При изменении данных возникла ошибка, ${err}`))
      .finally(() => {
        popupEditProfile.showLoading(false)
      })
  }});
popupEditProfile.setEventListeners()

const popupAvatar = new PopupWithForm('#avatar', {
  submitForm: (data) => {
    popupAvatar.showLoading(true)
    api.editAvatar(data)
      .then(res => {
        userInfo.setAvatar(res.avatar)
        popupAvatar.close();
      })
      .catch(err => console.log(`Ошибка загрузки: ${err}`))
      .finally(() => {
        popupAvatar.showLoading(false)
      })
  }
})
popupAvatar.setEventListeners();

popupAvatarOpenButton.addEventListener('click', () => {
  popupAvatar.open();
  formAvatarValidator.clearForm();
})

const zoomImage = new PopupWithImage('#image-popup');
zoomImage.setEventListeners();

const confirmDelete = new WarningPopup("#delete")
confirmDelete.setEventListeners();
  
const createCard = (cardData) => {
  const card = new Card(cardData, '#template', 
  (name, link) => {
    zoomImage.open(name, link)
  },
  (instance) => {
    confirmDelete.open()
    confirmDelete.callbackWarning(() => {
      api.deleteCard(instance.getCardId())
        .then(() => {
          instance.deleteCard()
          confirmDelete.close()
        })
        .catch(err => console.log(`Ошибка удаления карточки: ${err}`))
    })
  },
  (instance) => {
    if (instance.isLiked()) {
      api.deleteLike(instance.getCardId())
        .then(res => {
          instance.renderLikes(res.likes)
        })
        .catch(err => console.log(`Ошибка связи с сервером: ${err}`))
    } else {
      api.addLike(instance.getCardId())
        .then(res => {
          instance.renderLikes(res.likes)
        })
        .catch(err => console.log(`Ошибка связи с сервером: ${err}`))
    }
  }
  ).renderCard();
  return card;
}

const cardsList = new Section({
  renderer: (cardData) => {
    cardsList.setItem(createCard(cardData));
  }
}, '.cards__list');

popupCardOpenButton.addEventListener('click', () => {
  formElementMestoValidator.clearForm();
  popupAddCard.open();
})

const popupAddCard = new PopupWithForm('#cards-popup', {
  submitForm: (cardData) => {
    popupAddCard.showLoading(true)
    api.addCard(cardData.cards, cardData.link)
      .then (res => {
        const element = {
          name: res.name,
          link: res.link,
          likes: res.likes,
          cardId: res._id,
          userId: userId,
          ownerId: res.owner._id
        }
        cardsList.addItem(createCard(element));
        popupAddCard.close();
      })
      .catch(err => console.log(`Ошибка загрузки: ${err}`))
      .finally(() => {
        popupAddCard.showLoading(false)
      })
  }
})
popupAddCard.setEventListeners();