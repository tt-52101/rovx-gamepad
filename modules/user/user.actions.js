import React from 'react';
import { AsyncStorage } from 'react-native';
import { Store } from '@product/services/store';
import { UserYachts } from '../../shared/services/requests';
import { cacheCredentials } from '../../shared/services/store';
import ActionSheet from 'react-native-actionsheet';

import ImagePicker from 'react-native-image-crop-picker';
import { UploadCropPickerImage } from '@product/services/requests';
import { ChangeProfilePicturePost } from '@product/services/requests';
import { asEntities, alert } from '../../shared/common';
import { translate } from '../../shared/translate';

export function NavigateToProfile() {
  Store.navigation.navigate('Profile');
}
export function NavigateToLoginByEmail() {
  Store.navigation.navigate('EmailLogin');
}
export function NavigateToSignup() {
  Store.navigation.navigate('EmailSignup');
}

export function SetUser(user, token) {
  Store.user.next(user);
  Store.token.next(token);
  cacheCredentials({ user, token });
  UserYachts();
}

export function ResetUser() {
  Promise.resolve(AsyncStorage.removeItem('app_credentials'));
  Store.token.next(null);
  Store.userVessels.next([]);
  Store.user.next(null);
}

export async function profileImageHandler(source = 'gallery') {
  try {
    const image = await (source === 'gallery'
      ? fromGallery(false)
      : imageTakeFromCamera());

    this.setState({ isUploading: true });

    const image_upload_response = await UploadCropPickerImage(image[0]);

    this.setState({ isUploading: false });
    if (image_upload_response && image_upload_response.data) {
      let picture = image_upload_response.data.items[0].schema.publicUrl;
      this.setState({ isPosting: true });
      const response = await ChangeProfilePicturePost({ picture });
      this.setState({
        response,
        isPosting: false
      });
      const entities = asEntities(response);
      if (!entities && response.error) {
        return alert({
          text: response.error.message || translate('something_went_wrong')
        });
      }
      if (entities.length) {
        alert({
          text: translate('account_picture_successfully_updated')
        });
        SetUser({ ...entities[0].user }, entities[0].token);
      }
    }
  } catch (error) {
    this.setState({ isUploading: false, isPosting: false });
    if (error && error.code === 'E_PERMISSION_MISSING') {
      return alert({ text: translate('e_permission_missing') });
    }
    if (error && error.message && error.message.indexOf('cancelled') > -1) {
      return;
    }

    alert(translate('cannot_upload_picture' + error.message));
  }
}

export function cropPicture(image) {
  const width = image.width > 800 ? 800 : image.width;
  return ImagePicker.openCropper({
    path: image.path,
    includeBase64: true,
    width: width,
    height: width
  });
}

export async function fromGallery(multiple = true) {
  const images = await ImagePicker.openPicker({
    multiple: true
  });
  const croppedImages = [];
  for (let image of images) {
    croppedImages.push(await cropPicture(image));
  }
  return croppedImages;
}

export async function imageTakeFromCamera() {
  const camera = await ImagePicker.openCamera({ width: 800, height: 800 });
  return [await cropPicture(camera)];
}

export async function multiSourceImagePicker(source = 'gallery') {
  this.setState({ isUploading: true });
  try {
    const croppedImages = await (source === 'gallery'
      ? fromGallery()
      : imageTakeFromCamera());
    this.setState({ uploading: croppedImages.length });
    croppedImages.forEach(async image => {
      const response = await UploadCropPickerImage(image);
      if (response && response.data) {
        const image = response.data.items[0].schema.publicUrl;
        this.updateImages([...this.state.images, image]);
        this.setState({
          uploading: this.state.uploading - 1
        });
      }
    });
    this.setState({ isUploading: false });
  } catch (error) {
    this.setState({ isUploading: false });
    if (error && error.code === 'E_PERMISSION_MISSING') {
      return alert({ text: translate('e_permission_missing') });
    }
    if (error && error.message && error.message.indexOf('cancelled') > -1) {
      return;
    }

    alert({
      text: translate('cannot_upload_picture').replace('%msg%', error.message)
    });
  }
}

/* @description hostComponent is the place that the code should be ran on */
export function photoSourceActionSheet(handler) {
  return (
    <ActionSheet
      ref={o => (this.ImageSourceSelector = o)}
      title={translate('pick_photo_from')}
      options={[
        translate('take_photo_camera'),
        translate('gallery'),
        translate('cancel')
      ]}
      cancelButtonIndex={2}
      destructiveButtonIndex={1}
      onPress={index => {
        if (index === 1) {
          handler('gallery');
        }
        if (index === 0) {
          handler('camera');
        }
      }}
    />
  );
}
