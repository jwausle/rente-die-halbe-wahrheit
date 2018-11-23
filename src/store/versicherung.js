import Assert from '../mixins/Assert'

export default {
  methods: {
    versicherungen (krankenversicherung, rente, config) {
      Assert.requireDefined(config, 'config must be defined')
      Assert.requireDefined(config.versicherungAllg, 'config.versicherungAllg must be defined')
      Assert.requireDefined(config.krankenversicherung, 'config.krankenversicherung must be defined')
      Assert.requireDefined(config.pflegeversicherung, 'config.pflegeversicherung must be defined')
      if (krankenversicherung > 0) {
        return krankenversicherung - (rente * config.versicherungAllg)
      }
      return rente * (config.krankenversicherung + config.pflegeversicherung)
    }
  }
}
