export default async (req, res) => {
  let a = parseInt( req.query.a );
  let b = parseInt( req.query.b );
  return `${ (isNaN(a) ? 0 : a) + (isNaN(b) ? 0 : b)}`;
};
