import './styles/resets.scss'
import './styles/layout.scss'
import './styles/header.scss'
import './styles/buttons.scss'
import './styles/footer.scss'
import './styles/dialogs.scss'
import './styles/recipe-card.scss'
import './styles/login.scss'

import {App} from './js/App'

document.addEventListener("DOMContentLoaded", () => {
	App.onPageLoad()
	App.setupClickHandlers()
})