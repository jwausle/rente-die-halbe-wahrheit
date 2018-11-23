import Store from '../store'

export default {
  computed: {
    verbose: {
      get () { return Store.getters.verbose },
      set (nil) {}
    }
  },
  methods: {
    log (logger, message, optionalVerbose) {
      if (optionalVerbose) { /** From Store: Logger.methods.log('Store', 'message', state.config.verbose) */
        console.log(logger + ' - ' + message)
      } else if (this.verbose) { /** From VueComponent: mixin: [Logger] ... log('ComponentName', 'message') */
        console.log(logger + ' - ' + message)
      }
    }
  },
  log (logger, message, optionalVerbose) { return this.methods.log(logger, message, optionalVerbose) }
}
