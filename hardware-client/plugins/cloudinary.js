
import cloudinary from '~/Config/serviceCloudinary';

export default (context, inject) => {
  inject('cloudinary', cloudinary);
};
