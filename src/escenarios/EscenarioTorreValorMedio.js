/**
 * Escenario Torre del Valor Medio
 * Extiende Escenario.js y maneja el Teorema del Valor Medio
 */
import { Escenario } from './Escenario.js'
import { EstadoTorreValorMedio } from '../entidades/EstadoTorreValorMedio.js'
import { ConfiguracionTorreValorMedio } from '../entidades/ConfiguracionTorreValorMedio.js'
import { CalculadoraValorMedio } from '../servicios/CalculadoraValorMedio.js'
import { GestorVisualizacionTorre } from '../servicios/GestorVisualizacionTorre.js'
import { GestorLogros } from '../servicios/GestorLogros.js'
import { GestorTeoria } from '../servicios/GestorTeoria.js'
import { RenderizadorTorre } from '../presentacion/RenderizadorTorre.js'
import { RenderizadorCartesianoTorre } from '../presentacion/RenderizadorCartesianoTorre.js'

export class EscenarioTorreValorMedio extends Escenario {
    constructor() {
        super('Torre del Valor Medio', 'Escenario para el Teorema del Valor Medio')
        
        // Estado y configuración específicos
        this.estadoTorre = new EstadoTorreValorMedio()
        this.configuracionTorre = new ConfiguracionTorreValorMedio()
        
        // Servicios
        this.calculadora = new CalculadoraValorMedio()
        this.gestorLogros = new GestorLogros()
        this.gestorTeoria = new GestorTeoria()
        this.gestorVisualizacion = new GestorVisualizacionTorre(
            this.estadoTorre,
            this.configuracionTorre,
            this.calculadora
        )
        
        // Renderizadores
        this.renderizadorTorre = null
        this.renderizadorCartesiano = null
        
        // Estado de inicialización
        this.inicializado = false
        this.canvasConfigurado = false
    }

    // ✅ INICIALIZAR ESCENARIO
    inicializar() {
        try {
            // Asignar estado y configuración al escenario base
            this.estado = this.estadoTorre
            this.configuracion = this.configuracionTorre
            
            // Inicializar gestor de visualización
            this.gestorVisualizacion = new GestorVisualizacionTorre(
                this.estadoTorre,
                this.configuracionTorre,
                this.calculadora
            )
            
            this.inicializado = true
            return this
        } catch (error) {
            console.error('Error inicializando EscenarioTorreValorMedio:', error)
            throw error
        }
    }

    // ✅ CONFIGURAR CANVAS
    configurarCanvas(canvasTorre, canvasCartesiano, containerTooltip = null) {
        try {
            if (!this.inicializado) {
                throw new Error('El escenario debe estar inicializado antes de configurar canvas')
            }
            
            // Configurar gestor de visualización
            this.gestorVisualizacion.configurarCanvas(canvasTorre, canvasCartesiano)
            
            // Crear renderizadores
            this.renderizadorTorre = new RenderizadorTorre(canvasTorre, this.configuracionTorre)
            this.renderizadorCartesiano = new RenderizadorCartesianoTorre(canvasCartesiano, this.configuracionTorre)
            
            // Configurar dimensiones
            this.renderizadorTorre.configurarDimensiones()
            this.renderizadorCartesiano.configurarDimensiones()
            
            this.canvasConfigurado = true
            
            // Renderizar inicial
            this.renderizarCompleto()
            
            return this
        } catch (error) {
            console.error('Error configurando canvas:', error)
            throw error
        }
    }

    // ✅ RENDERIZAR COMPLETO
    renderizarCompleto() {
        if (!this.canvasConfigurado) return
        
        try {
            const funcion = this.estadoTorre.obtenerFuncion()
            const limites = this.estadoTorre.obtenerLimites()
            const alturaPromedio = this.estadoTorre.obtenerAlturaPromedio()
            const estimacionUsuario = this.estadoTorre.obtenerEstimacionUsuario()
            const puntoCReal = this.estadoTorre.obtenerPuntoCReal()
            
            // Renderizar torre
            if (this.renderizadorTorre) {
                this.renderizadorTorre.renderizar(funcion, limites, alturaPromedio, estimacionUsuario)
            }
            
            // Renderizar plano cartesiano
            if (this.renderizadorCartesiano) {
                this.renderizadorCartesiano.renderizar(funcion, limites, estimacionUsuario, puntoCReal)
            }
        } catch (error) {
            console.error('Error en renderizado completo:', error)
        }
    }

    // ✅ ESTABLECER FUNCIÓN
    establecerFuncion(tipo, funcionPersonalizada = '') {
        try {
            this.estadoTorre.establecerFuncion(tipo, funcionPersonalizada)
            this.renderizarCompleto()
            return this
        } catch (error) {
            console.error('Error estableciendo función:', error)
            throw error
        }
    }

    // ✅ ESTABLECER LÍMITES
    establecerLimites(a, b) {
        try {
            this.estadoTorre.establecerLimites(a, b)
            this.renderizarCompleto()
            return this
        } catch (error) {
            console.error('Error estableciendo límites:', error)
            throw error
        }
    }

    // ✅ ESTABLECER ESTIMACIÓN DEL USUARIO
    establecerEstimacionUsuario(c) {
        try {
            this.estadoTorre.establecerEstimacionUsuario(c)
            this.renderizarCompleto()
            return this
        } catch (error) {
            console.error('Error estableciendo estimación:', error)
            throw error
        }
    }

    // ✅ CALCULAR PUNTO C REAL
    calcularPuntoCReal() {
        try {
            const puntoCReal = this.estadoTorre.calcularPuntoCReal()
            this.renderizarCompleto()
            return puntoCReal
        } catch (error) {
            console.error('Error calculando punto c real:', error)
            throw error
        }
    }

    // ✅ VERIFICAR ESTIMACIÓN
    verificarEstimacion() {
        try {
            const verificacionExitosa = this.estadoTorre.verificarEstimacion()
            this.renderizarCompleto()
            return verificacionExitosa
        } catch (error) {
            console.error('Error verificando estimación:', error)
            throw error
        }
    }

    // ✅ CARGAR EJEMPLO
    cargarEjemplo(ejemplo) {
        try {
            this.estadoTorre.cargarEjemplo(ejemplo)
            this.renderizarCompleto()
            return this
        } catch (error) {
            console.error('Error cargando ejemplo:', error)
            throw error
        }
    }

    // ✅ RESETEAR ESCENARIO
    resetear() {
        try {
            this.estadoTorre.resetear()
            this.renderizarCompleto()
            return this
        } catch (error) {
            console.error('Error reseteando escenario:', error)
            throw error
        }
    }

    // ✅ MANEJAR CLICK EN TORRE
    manejarClickTorre(evento) {
        if (!this.renderizadorTorre) return null
        
        try {
            const limites = this.estadoTorre.obtenerLimites()
            
            if (this.renderizadorTorre.esClickValido(evento, limites)) {
                const x = this.renderizadorTorre.convertirCoordenadasAX(evento, limites)
                if (x !== null) {
                    this.establecerEstimacionUsuario(x)
                    return x
                }
            }
            
            return null
        } catch (error) {
            console.error('Error manejando click en torre:', error)
            return null
        }
    }

    // ✅ MANEJAR CLICK EN CARTESIANO
    manejarClickCartesiano(evento) {
        if (!this.renderizadorCartesiano) return null
        
        try {
            const limites = this.estadoTorre.obtenerLimites()
            
            if (this.renderizadorCartesiano.esClickValido(evento, limites)) {
                const { x } = this.renderizadorCartesiano.obtenerCoordenadasClick(evento)
                this.establecerEstimacionUsuario(x)
                return x
            }
            
            return null
        } catch (error) {
            console.error('Error manejando click en cartesiano:', error)
            return null
        }
    }

    // ✅ OBTENER INFORMACIÓN DE HOVER
    obtenerInformacionHover(evento, tipoCanvas) {
        try {
            if (tipoCanvas === 'torre' && this.renderizadorTorre) {
                const limites = this.estadoTorre.obtenerLimites()
                const posicionRelativa = this.renderizadorTorre.obtenerCoordenadasClick(evento)
                if (posicionRelativa !== null) {
                    const { a, b } = limites
                    const x = a + posicionRelativa * (b - a)
                    const funcion = this.estadoTorre.obtenerFuncion()
                    const y = funcion(x)
                    return { x, y }
                }
            } else if (tipoCanvas === 'cartesiano' && this.renderizadorCartesiano) {
                return this.renderizadorCartesiano.obtenerCoordenadasClick(evento)
            }
            
            return null
        } catch (error) {
            console.error('Error obteniendo información de hover:', error)
            return null
        }
    }

    // ✅ OBTENER ESTADO
    obtenerEstado() {
        return this.estadoTorre
    }

    // ✅ OBTENER CONFIGURACIÓN
    obtenerConfiguracion() {
        return this.configuracionTorre
    }

    // ✅ OBTENER CÁLCULOS
    obtenerCalculos() {
        return {
            alturaPromedio: this.estadoTorre.obtenerAlturaPromedio(),
            estimacionUsuario: this.estadoTorre.obtenerEstimacionUsuario(),
            puntoCReal: this.estadoTorre.obtenerPuntoCReal(),
            errorEstimacion: this.estadoTorre.obtenerErrorEstimacion(),
            verificacionExitosa: this.estadoTorre.obtenerVerificacionExitosa()
        }
    }

    // ✅ OBTENER MÉTRICAS
    obtenerMetricas() {
        return this.estadoTorre.obtenerMetricas()
    }

    // ✅ OBTENER EJEMPLOS
    obtenerEjemplos() {
        return this.configuracionTorre.obtenerTodosLosEjemplos()
    }

    // ✅ OBTENER LOGROS
    obtenerLogros() {
        return this.gestorLogros.obtenerLogrosPorEscenario('tvm')
    }

    // ✅ VERIFICAR LOGROS
    verificarLogros() {
        const datos = {
            estimacionUsuario: this.estadoTorre.obtenerEstimacionUsuario(),
            errorEstimacion: this.estadoTorre.obtenerErrorEstimacion(),
            estimacionesExcelentes: this.estadoTorre.obtenerMetricas().estimacionesExcelentes,
            ejemplosCompletados: this.estadoTorre.obtenerEjemplosCompletados?.() || 0,
            tiempoCompletado: this.estadoTorre.obtenerTiempoTranscurrido()
        }
        
        return this.gestorLogros.verificarLogros(datos)
    }

    // ✅ VERIFICAR CONDICIONES DEL TEOREMA
    verificarCondicionesTeorema() {
        const funcion = this.estadoTorre.obtenerFuncion()
        const limites = this.estadoTorre.obtenerLimites()
        
        return this.calculadora.verificarCondicionesTeorema(funcion, limites.a, limites.b)
    }

    // ✅ OBTENER INFORMACIÓN DEL TEOREMA
    obtenerInformacionTeorema() {
        console.log('📚 Obteniendo información del teorema...')
        console.log('- GestorTeoria:', this.gestorTeoria)
        
        if (!this.gestorTeoria) {
            console.error('❌ GestorTeoria no está inicializado')
            return null
        }
        
        const teoria = this.gestorTeoria.obtenerTeoria('torreValorMedio')
        console.log('- Teoría obtenida:', teoria)
        
        if (!teoria) {
            console.error('❌ No se encontró la teoría torreValorMedio')
            return null
        }
        
        const limites = this.estadoTorre.obtenerLimites()
        const funcion = this.estadoTorre.obtenerFuncion()
        const alturaPromedio = this.estadoTorre.obtenerAlturaPromedio()
        
        const informacionCompleta = teoria.obtenerInformacionCompleta()
        console.log('- Información completa:', informacionCompleta)
        
        return {
            ...informacionCompleta,
            datosDinamicos: {
                limites: limites,
                alturaPromedio: alturaPromedio,
                pendienteSecante: this.calculadora.calcularPendienteSecante(funcion, limites.a, limites.b)
            }
        }
    }

    // ✅ DESTRUIR ESCENARIO
    destruir() {
        try {
            this.renderizadorTorre = null
            this.renderizadorCartesiano = null
            this.gestorVisualizacion = null
            this.calculadora = null
            this.estadoTorre = null
            this.configuracionTorre = null
            this.inicializado = false
            this.canvasConfigurado = false
        } catch (error) {
            console.error('Error destruyendo escenario:', error)
        }
    }
}
