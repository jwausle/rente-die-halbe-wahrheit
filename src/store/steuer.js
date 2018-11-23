export const SOLI_PROZENT = 5.5 / 100

export default {
  methods: {
    steuer_soli (einkommen) {
      return einkommen * SOLI_PROZENT
    },
    steuer_einkommensSteuer (einkommen) {
      if (einkommen <= 8652) {
        return 0
      } else if (einkommen <= 13669) {
        return Math.round(((974.58 * (einkommen - 8354) / 10000 + 1400) * (einkommen - 8354) / 10000) * 1000) / 1000
      } else if (einkommen <= 52881) {
        return Math.round(((228.74 * (einkommen - 13469) / 10000 + 2397) * (einkommen - 13469) / 10000 + 971) * 1000) / 1000
      } else if (einkommen <= 250730) {
        return (einkommen * 0.42 - 8239)
      } else {
        return einkommen * 0.45 - 15761
      }
    }
  }
}
