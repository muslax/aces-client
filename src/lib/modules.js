import AIME_1_0 from "lib/aime-1.0";
import GPQ_1_0 from "lib/gpq-1.0";
import SJT_ASN_1_0 from "lib/sjt-asn-1.0";

const ACES_MODULES = {
  aime_1_0:     AIME_1_0,
  gpq_1_0:      GPQ_1_0,
  sjt_asn_1_0:  SJT_ASN_1_0,
  //
  interview_1_0: {
    info: {

    }
  },
  presentation_1_0: {
    info: {

    }
  },
}

/**
 * Get module data identified by its key
 * @param {string} slug Module slug
 * @param {string} key Module key (info, items, etc)
 * @returns module data or null
 */
export function ACESModule(slug, key) {
  const decoded = slug?.replaceAll(/\-|\./g, '_')
  console.log(slug, decoded, key)
  return ACES_MODULES[decoded][key] ? ACES_MODULES[decoded][key] : null
}

/**
 * Get test item at specified sequence seq
 * @param {string} slug Module slug
 * @param {number} seq Item number
 */
export function ACESTestItem(slug, seq) {
  const decoded = slug.replaceAll(/\-|\./g, '_')
  console.log(decoded)
  return ACES_MODULES[decoded]['items'][seq] ? ACES_MODULES[decoded]['items'][seq] : null
}

/**
 * Get the slug of user's project module
 * @param {Object} user
 * @param {string} type
 */
export function getTestSlug(user, type) {
  console.log(user)
  for (let i = 0; i < user.tests.length; i++) {
    if (user.tests[i].indexOf(type) == 0) return user.tests[i]
  }

  return null
}


/**
 * Get module from modules array
 * @param {Array} modules array
 * @param {string} slug - A unique slug representing Aces Module
 * @returns {Object} or null
 */
export function getBySlug(modules, slug) {
  for (let i = 0; i < modules?.length; i++) {
    if (modules[i].slug == slug) return modules[i]
  }

  return null
}

/**
 * Get module from modules array
 * @param {Array} modules array
 * @param {string} type - A unique slug representing Aces Module
 * @returns {Object} First module found with specified type, or null.
 */
export function getByType(modules, type) {
  for (let i = 0; i < modules?.length; i++) {
    if (modules[i].type == type) return modules[i]
  }

  return null
}
