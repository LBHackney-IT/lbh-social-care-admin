const { check, oneOf } = require('express-validator');

const searchValidation = [
  check("postcode", "Enter a postcode")
    .if(
      check("searchby").contains('postcode'))
    .trim().escape().notEmpty(),
  check("postcode", "Enter a valid postcode")
    .if(
      check("searchby").contains('postcode'))
    .notEmpty().isPostalCode("GB"),
  check("id", "Enter a valid Annex ID")
    .if(
      check("searchby").contains('id'))
    .notEmpty().isInt()
]

const searchResidentValidation = [
  oneOf(
    [
      check('mosaicId').notEmpty(),
      check('firstName').notEmpty(),
      check('lastName').notEmpty()
    ], 'Enter at least Mosiac Id, name or date of birth')
]


module.exports = {
  searchValidation,
  searchResidentValidation
}