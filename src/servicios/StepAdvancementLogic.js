/**
 * Clase especializada en la lógica de avance de pasos del Segundo Teorema
 * Maneja la validación y transición entre pasos secuenciales
 * 
 * RESPONSABILIDAD: Lógica de avance y validación de pasos
 * PRINCIPIO SRP: Una sola razón para cambiar - la lógica de avance de pasos
 */
class StepAdvancementLogic {
  constructor() {
    this.visibilityManager = new StepVisibilityManager()
    this.validator = new ValidatorSet()
    this.metrics = new MetricsTracker()
    this.currentStep = 1
    this.userData = {
      function: "",
      antiderivative: "",
      fA: "",
      fB: "",
      result: 0,
      isComplete: false
    }
  }
  
  /**
   * Procesar completación de paso
   * Valida la entrada del usuario y decide si avanzar al siguiente paso
   * 
   * @param {number} stepNumber - Número del paso actual
   * @param {string} userInput - Entrada del usuario
   * @returns {Object} Resultado del procesamiento
   */
  processStepCompletion(stepNumber, userInput) {
    console.log(`🔄 Procesando completación del paso ${stepNumber}`)
    console.log(`📝 Entrada del usuario: "${userInput}"`)
    
    let validationResult
    
    try {
      switch (stepNumber) {
        case 1:
          validationResult = this.validator.validateCustomFunction(userInput)
          if (validationResult.valid) {
            this.userData.function = userInput
          }
          break
        case 2:
          validationResult = this.validator.validateAntiderivative(userInput, this.userData.function)
          if (validationResult.valid) {
            this.userData.antiderivative = userInput
          }
          break
        case 3:
          validationResult = this.validator.validateLimitEvaluation(userInput, "")
          if (validationResult.valid) {
            // Determinar si es F(a) o F(b) basado en el contexto
            if (this.userData.fA === "") {
              this.userData.fA = userInput
            } else {
              this.userData.fB = userInput
            }
          }
          break
        default:
          return { success: false, error: "Paso inválido" }
      }
      
      if (validationResult.valid) {
        // Mostrar retroalimentación positiva
        this.showSuccessFeedback(stepNumber)
        
        // Avanzar al siguiente paso después de un delay
        setTimeout(() => {
          this.advanceToNextStep(stepNumber)
        }, 1500)
        
        // Registrar métricas
        this.metrics.recordStepCompletion(stepNumber)
        
        return { success: true, message: "Paso completado correctamente" }
      } else {
        // Mostrar retroalimentación negativa
        this.showErrorFeedback(stepNumber, validationResult.error)
        this.metrics.recordAttempt(stepNumber)
        
        return { success: false, error: validationResult.error }
      }
    } catch (error) {
      console.error(`❌ Error procesando paso ${stepNumber}:`, error)
      this.showErrorFeedback(stepNumber, "Error interno del sistema")
      return { success: false, error: "Error interno del sistema" }
    }
  }
  
  /**
   * Avanzar al siguiente paso
   * 
   * @param {number} currentStep - Paso actual
   */
  advanceToNextStep(currentStep) {
    console.log(`🚀 Avanzando del paso ${currentStep} al paso ${currentStep + 1}`)
    
    // Ocultar retroalimentación actual
    this.visibilityManager.hideFeedback(currentStep)
    
    // Mostrar siguiente paso
    this.visibilityManager.showNextStep(currentStep)
    
    // Actualizar paso actual
    this.currentStep = currentStep + 1
    
    // Si es el último paso, calcular resultado
    if (this.currentStep === 4) {
      this.calculateFinalResult()
    }
  }
  
  /**
   * Mostrar retroalimentación positiva
   * 
   * @param {number} stepNumber - Número del paso
   */
  showSuccessFeedback(stepNumber) {
    const messages = {
      1: "¡Función válida! Avanzando al siguiente paso...",
      2: "¡Antiderivada correcta! Avanzando al siguiente paso...",
      3: "¡Evaluación correcta! Calculando resultado final..."
    }
    
    this.visibilityManager.showFeedback(stepNumber, messages[stepNumber], "success")
  }
  
  /**
   * Mostrar retroalimentación negativa
   * 
   * @param {number} stepNumber - Número del paso
   * @param {string} error - Mensaje de error
   */
  showErrorFeedback(stepNumber, error) {
    this.visibilityManager.showFeedback(stepNumber, error, "error")
  }
  
  /**
   * Calcular resultado final
   * Aplica el Segundo Teorema Fundamental: ∫[a,b] f(x)dx = F(b) - F(a)
   */
  calculateFinalResult() {
    console.log('🧮 Calculando resultado final del Segundo Teorema')
    
    try {
      const fA = parseFloat(this.userData.fA)
      const fB = parseFloat(this.userData.fB)
      
      if (isNaN(fA) || isNaN(fB)) {
        throw new Error("Valores de evaluación inválidos")
      }
      
      // Segundo Teorema Fundamental: ∫[a,b] f(x)dx = F(b) - F(a)
      this.userData.result = fB - fA
      
      console.log(`📊 Resultado: F(${fB}) - F(${fA}) = ${this.userData.result}`)
      
      // Mostrar resultado en el paso 4
      this.displayFinalResult()
      
      // Marcar como completo
      this.userData.isComplete = true
      
      // Registrar logros
      this.recordAchievements()
      
    } catch (error) {
      console.error('❌ Error calculando resultado final:', error)
      this.visibilityManager.showFeedback(4, "Error calculando resultado final", "error")
    }
  }
  
  /**
   * Mostrar resultado final en el paso 4
   */
  displayFinalResult() {
    const resultElement = document.getElementById('result-display')
    if (resultElement) {
      resultElement.textContent = this.userData.result.toFixed(4)
    }
    
    // Mostrar explicación
    const explanation = `
      Segundo Teorema Fundamental del Cálculo:
      ∫[a,b] f(x)dx = F(b) - F(a)
      
      En nuestro caso:
      ∫[a,b] f(x)dx = ${this.userData.fB} - ${this.userData.fA} = ${this.userData.result.toFixed(4)}
    `
    
    this.visibilityManager.showFeedback(4, explanation, "success")
  }
  
  /**
   * Registrar logros del usuario
   */
  recordAchievements() {
    console.log('🏆 Registrando logros del Segundo Teorema')
    
    const achievements = []
    
    // Logro por completar el proceso
    achievements.push({
      id: "segundo-teorema-completado",
      nombre: "Segundo Teorema Dominado",
      descripcion: "Completaste exitosamente el Segundo Teorema Fundamental del Cálculo",
      fecha: new Date()
    })
    
    // Logro por precisión
    const accuracy = this.metrics.getAccuracy()
    if (accuracy > 0.8) {
      achievements.push({
        id: "alta-precision-segundo-teorema",
        nombre: "Precisión Matemática",
        descripcion: "Alta precisión en el Segundo Teorema Fundamental",
        fecha: new Date()
      })
    }
    
    // Logro por velocidad
    const totalTime = this.metrics.getTotalTime()
    if (totalTime < 300000) { // Menos de 5 minutos
      achievements.push({
        id: "rapido-segundo-teorema",
        nombre: "Velocidad Matemática",
        descripcion: "Completaste el Segundo Teorema en tiempo récord",
        fecha: new Date()
      })
    }
    
    console.log(`🏆 Logros desbloqueados: ${achievements.length}`)
    return achievements
  }
  
  /**
   * Obtener estado actual del proceso
   * 
   * @returns {Object} Estado actual
   */
  getCurrentState() {
    return {
      currentStep: this.currentStep,
      userData: this.userData,
      metrics: this.metrics.getMetrics(),
      visibilityState: this.visibilityManager.getVisibilityState()
    }
  }
  
  /**
   * Resetear proceso completo
   * Vuelve al paso inicial
   */
  resetProcess() {
    console.log('🔄 Reseteando proceso del Segundo Teorema')
    
    this.currentStep = 1
    this.userData = {
      function: "",
      antiderivative: "",
      fA: "",
      fB: "",
      result: 0,
      isComplete: false
    }
    
    this.visibilityManager.resetToInitialStep()
    this.metrics.reset()
  }
  
  /**
   * Verificar si el proceso está completo
   * 
   * @returns {boolean} True si el proceso está completo
   */
  isProcessComplete() {
    return this.userData.isComplete
  }
}
