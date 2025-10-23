/**
 * Clase especializada en manejar la visibilidad de pasos secuenciales
 * Implementa el patrón de mostrar solo un paso a la vez
 * 
 * RESPONSABILIDAD: Gestión de visibilidad de pasos del Segundo Teorema Fundamental
 * PRINCIPIO SRP: Una sola razón para cambiar - la lógica de visibilidad de pasos
 */
class StepVisibilityManager {
  constructor() {
    this.currentVisibleStep = 1
    this.stepElements = new Map()
    this.totalSteps = 4
    this.initializeStepVisibility()
  }
  
  /**
   * Inicializar visibilidad de pasos (solo paso 1 visible)
   * Implementa el estado inicial donde solo se muestra el primer paso
   */
  initializeStepVisibility() {
    console.log('🎯 Inicializando visibilidad de pasos - Solo paso 1 visible')
    
    for (let i = 1; i <= this.totalSteps; i++) {
      const stepElement = document.getElementById(`step-${i}`)
      if (stepElement) {
        if (i === 1) {
          stepElement.style.display = "block"
          stepElement.classList.add("active")
          console.log(`✅ Paso ${i} visible`)
        } else {
          stepElement.style.display = "none"
          stepElement.classList.remove("active")
          console.log(`❌ Paso ${i} oculto`)
        }
        this.stepElements.set(i, stepElement)
      } else {
        console.warn(`⚠️ No se encontró elemento step-${i}`)
      }
    }
  }
  
  /**
   * Mostrar siguiente paso
   * Oculta el paso actual y muestra el siguiente
   * 
   * @param {number} currentStep - Número del paso actual
   */
  showNextStep(currentStep) {
    console.log(`🔄 Avanzando del paso ${currentStep} al paso ${currentStep + 1}`)
    
    // Ocultar paso actual
    const currentElement = this.stepElements.get(currentStep)
    if (currentElement) {
      currentElement.style.display = "none"
      currentElement.classList.remove("active")
      console.log(`❌ Paso ${currentStep} oculto`)
    }
    
    // Mostrar siguiente paso
    const nextStep = currentStep + 1
    if (nextStep <= this.totalSteps) {
      const nextElement = this.stepElements.get(nextStep)
      if (nextElement) {
        nextElement.style.display = "block"
        nextElement.classList.add("active")
        this.currentVisibleStep = nextStep
        console.log(`✅ Paso ${nextStep} visible`)
      } else {
        console.error(`❌ No se encontró elemento step-${nextStep}`)
      }
    } else {
      console.log('🎉 Todos los pasos completados')
    }
  }
  
  /**
   * Obtener paso actualmente visible
   * 
   * @returns {number} Número del paso actualmente visible
   */
  getCurrentVisibleStep() {
    return this.currentVisibleStep
  }
  
  /**
   * Mostrar retroalimentación para un paso específico
   * 
   * @param {number} stepNumber - Número del paso
   * @param {string} message - Mensaje de retroalimentación
   * @param {string} type - Tipo de retroalimentación (success, error, info)
   */
  showFeedback(stepNumber, message, type = "info") {
    const feedbackElement = document.getElementById(`feedback-${stepNumber}`)
    if (feedbackElement) {
      feedbackElement.textContent = message
      feedbackElement.className = `feedback ${type}`
      feedbackElement.style.display = "block"
      console.log(`💬 Feedback paso ${stepNumber} (${type}): ${message}`)
    } else {
      console.warn(`⚠️ No se encontró elemento feedback-${stepNumber}`)
    }
  }
  
  /**
   * Ocultar retroalimentación de un paso
   * 
   * @param {number} stepNumber - Número del paso
   */
  hideFeedback(stepNumber) {
    const feedbackElement = document.getElementById(`feedback-${stepNumber}`)
    if (feedbackElement) {
      feedbackElement.style.display = "none"
      console.log(`🔇 Feedback paso ${stepNumber} oculto`)
    }
  }
  
  /**
   * Resetear a paso inicial
   * Vuelve a mostrar solo el paso 1
   */
  resetToInitialStep() {
    console.log('🔄 Reseteando a paso inicial')
    this.currentVisibleStep = 1
    this.initializeStepVisibility()
  }
  
  /**
   * Verificar si un paso está visible
   * 
   * @param {number} stepNumber - Número del paso
   * @returns {boolean} True si el paso está visible
   */
  isStepVisible(stepNumber) {
    const stepElement = this.stepElements.get(stepNumber)
    return stepElement && stepElement.style.display !== "none"
  }
  
  /**
   * Obtener estado de visibilidad de todos los pasos
   * 
   * @returns {Object} Estado de visibilidad de cada paso
   */
  getVisibilityState() {
    const state = {}
    for (let i = 1; i <= this.totalSteps; i++) {
      state[i] = this.isStepVisible(i)
    }
    return state
  }
}
