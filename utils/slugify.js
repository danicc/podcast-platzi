import slugify from 'slugify';

export default function(name) {
  return slugify(name, { lower: true}).replace(/[^\w\-]+/g, '');
}