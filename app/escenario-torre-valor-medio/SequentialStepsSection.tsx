import React from 'react'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'

interface SequentialStepsSectionProps {
  // Estado del Segundo Teorema
  funcionSegundoTeorema: string
  limiteASegundoTeorema: number
  limiteBSegundoTeorema: number
  funcionPersonalizadaSegundoTeorema: string
  antiderivadaUsuario: string
  evaluacionA: string
  evaluacionB: string
  resultadoIntegral: number
  errorFuncionPersonalizadaSegundoTeorema: string
  errorAntiderivada: string
  errorEvaluacion: string
  mostrarTecladoSegundoTeorema: boolean
  
  // Handlers
  handleCustomFunctionInput: (input: string) => void
  handleAntiderivativeInput: (input: string) => void
  handleLimitEvaluationInput: (input: string, type: 'fA' | 'fB') => void
  handleResetearSegundoTeorema: () => void
  setMostrarTecladoSegundoTeorema: (show: boolean) => void
  setFuncionPersonalizadaSegundoTeorema: (func: string) => void
  setAntiderivadaUsuario: (antiderivative: string) => void
  setEvaluacionA: (value: string) => void
  setEvaluacionB: (value: string) => void
}

export const SequentialStepsSection: React.FC<SequentialStepsSectionProps> = ({
  funcionSegundoTeorema,
  limiteASegundoTeorema,
  limiteBSegundoTeorema,
  funcionPersonalizadaSegundoTeorema,
  antiderivadaUsuario,
  evaluacionA,
  evaluacionB,
  resultadoIntegral,
  errorFuncionPersonalizadaSegundoTeorema,
  errorAntiderivada,
  errorEvaluacion,
  mostrarTecladoSegundoTeorema,
  handleCustomFunctionInput,
  handleAntiderivativeInput,
  handleLimitEvaluationInput,
  handleResetearSegundoTeorema,
  setMostrarTecladoSegundoTeorema,
  setFuncionPersonalizadaSegundoTeorema,
  setAntiderivadaUsuario,
  setEvaluacionA,
  setEvaluacionB
}) => {
  return (
    <div className="space-y-4">
      {/* Objetivo Principal */}
      <div className="bg-purple-100 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold text-purple-800 mb-2">
          🎯 Objetivo: Usa el Segundo Teorema Fundamental para calcular la integral
        </h3>
      </div>

      {/* Sistema de Pasos Secuenciales */}
      <div className="space-y-4">
        {/* Paso 1: Función dada */}
        <div id="step-1" className="step-container bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
            Paso 1: Función dada
          </h3>
          <div className="text-center">
            <div className="text-2xl font-mono mb-2">
              f(x) = {funcionSegundoTeorema === 'seno' ? 'sin(x)' : 
                     funcionSegundoTeorema === 'coseno' ? 'cos(x)' :
                     funcionSegundoTeorema === 'exponencial' ? 'e^x' : 
                     funcionSegundoTeorema === 'personalizada' ? (funcionPersonalizadaSegundoTeorema || 'f(x)') : 'sin(x)'}
            </div>
            <div className="text-gray-600">
              Queremos calcular: ∫[{limiteASegundoTeorema.toFixed(1)} → {limiteBSegundoTeorema.toFixed(1)}] f(x)dx
            </div>
            
            {/* Entrada de función personalizada */}
            {funcionSegundoTeorema === 'personalizada' && (
              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium">Ingresa tu función personalizada:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={funcionPersonalizadaSegundoTeorema}
                    onChange={(e) => handleCustomFunctionInput(e.target.value)}
                    placeholder="Ej: x**2 + 3*x + 1"
                    className="flex-1 p-2 border rounded text-sm"
                  />
                  <Button
                    onClick={() => setMostrarTecladoSegundoTeorema(!mostrarTecladoSegundoTeorema)}
                    variant="outline"
                    size="sm"
                  >
                    {mostrarTecladoSegundoTeorema ? "Ocultar" : "Mostrar"} Teclado
                  </Button>
                </div>
                
                {errorFuncionPersonalizadaSegundoTeorema && (
                  <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                    {errorFuncionPersonalizadaSegundoTeorema}
                  </div>
                )}
                
                {/* Teclado Matemático para función personalizada */}
                {mostrarTecladoSegundoTeorema && (
                  <div className="bg-gray-50 p-4 rounded-lg mt-2">
                    <h4 className="text-sm font-medium mb-2">Teclado Matemático</h4>
                    <div className="grid grid-cols-6 gap-2">
                      {/* Números */}
                      {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                        <Button
                          key={num}
                          size="sm"
                          variant="outline"
                          onClick={() => setFuncionPersonalizadaSegundoTeorema(prev => prev + num)}
                          className="text-xs"
                        >
                          {num}
                        </Button>
                      ))}
                      
                      {/* Operaciones */}
                      {['+', '-', '*', '/', '^', '(', ')'].map(op => (
                        <Button
                          key={op}
                          size="sm"
                          variant="outline"
                          onClick={() => setFuncionPersonalizadaSegundoTeorema(prev => prev + op)}
                          className="text-xs"
                        >
                          {op}
                        </Button>
                      ))}
                      
                      {/* Funciones */}
                      {['sin', 'cos', 'tan', 'log', 'exp', 'sqrt'].map(func => (
                        <Button
                          key={func}
                          size="sm"
                          variant="outline"
                          onClick={() => setFuncionPersonalizadaSegundoTeorema(prev => prev + func + '(x)')}
                          className="text-xs"
                        >
                          {func}
                        </Button>
                      ))}
                      
                      {/* Variable x */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setFuncionPersonalizadaSegundoTeorema(prev => prev + 'x')}
                        className="text-xs"
                      >
                        x
                      </Button>
                      
                      {/* Control */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setFuncionPersonalizadaSegundoTeorema(prev => prev.slice(0, -1))}
                        className="text-xs"
                      >
                        ←
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setFuncionPersonalizadaSegundoTeorema('')}
                        className="text-xs"
                      >
                        C
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div id="feedback-1" className="feedback"></div>
        </div>

        {/* Paso 2: Encuentra la antiderivada */}
        <div id="step-2" className="step-container bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
            <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
            Paso 2: Encuentra la antiderivada F(x)
          </h3>
          <div className="mb-4">
            <div className="text-gray-700 mb-2">
              Recuerda: F'(x) = f(x). ¿Qué función al derivarla da {funcionSegundoTeorema === 'seno' ? 'sin(x)' : 
                                                                        funcionSegundoTeorema === 'coseno' ? 'cos(x)' :
                                                                        funcionSegundoTeorema === 'exponencial' ? 'e^x' : 'f(x)'}?
            </div>
            <div className="text-sm text-gray-600 mb-2">
              {funcionSegundoTeorema === 'seno' ? 'Ej: -cos(x), -Math.cos(x)' :
               funcionSegundoTeorema === 'coseno' ? 'Ej: sin(x), Math.sin(x)' :
               funcionSegundoTeorema === 'exponencial' ? 'Ej: exp(x), Math.exp(x)' :
               'Ej: (x**2)/2, (x**3)/3'}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">F(x) =</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={antiderivadaUsuario}
                onChange={(e) => handleAntiderivativeInput(e.target.value)}
                placeholder="Ej: -cos(x)"
                className="flex-1 p-2 border rounded text-sm"
              />
              <Button
                onClick={() => setMostrarTecladoSegundoTeorema(!mostrarTecladoSegundoTeorema)}
                variant="outline"
                size="sm"
              >
                {mostrarTecladoSegundoTeorema ? "Ocultar" : "Mostrar"} Teclado
              </Button>
            </div>
            
            {/* Teclado Matemático */}
            {mostrarTecladoSegundoTeorema && (
              <div className="bg-gray-50 p-4 rounded-lg mt-2">
                <h4 className="text-sm font-medium mb-2">Teclado Matemático</h4>
                <div className="grid grid-cols-6 gap-2">
                  {/* Números */}
                  {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                    <Button
                      key={num}
                      size="sm"
                      variant="outline"
                      onClick={() => setAntiderivadaUsuario(prev => prev + num)}
                      className="text-xs"
                    >
                      {num}
                    </Button>
                  ))}
                  
                  {/* Operaciones */}
                  {['+', '-', '*', '/', '^', '(', ')'].map(op => (
                    <Button
                      key={op}
                      size="sm"
                      variant="outline"
                      onClick={() => setAntiderivadaUsuario(prev => prev + op)}
                      className="text-xs"
                    >
                      {op}
                    </Button>
                  ))}
                  
                  {/* Funciones */}
                  {['sin', 'cos', 'tan', 'log', 'exp', 'sqrt'].map(func => (
                    <Button
                      key={func}
                      size="sm"
                      variant="outline"
                      onClick={() => setAntiderivadaUsuario(prev => prev + func + '(x)')}
                      className="text-xs"
                    >
                      {func}
                    </Button>
                  ))}
                  
                  {/* Variable x */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setAntiderivadaUsuario(prev => prev + 'x')}
                    className="text-xs"
                  >
                    x
                  </Button>
                  
                  {/* Control */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setAntiderivadaUsuario(prev => prev.slice(0, -1))}
                    className="text-xs"
                  >
                    ←
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setAntiderivadaUsuario('')}
                    className="text-xs"
                  >
                    C
                  </Button>
                </div>
              </div>
            )}
            
            {errorAntiderivada && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {errorAntiderivada}
              </div>
            )}
          </div>
          <div id="feedback-2" className="feedback"></div>
        </div>

        {/* Paso 3: Evalúa en los límites */}
        <div id="step-3" className="step-container bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center gap-2">
            <span className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
            Paso 3: Evalúa F(x) en los límites
          </h3>
          <div className="mb-4">
            <div className="text-gray-700 mb-2">
              Ahora evalúa tu antiderivada F(x) en los límites de integración:
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">F({limiteASegundoTeorema.toFixed(1)}) =</label>
              <input
                type="text"
                value={evaluacionA}
                onChange={(e) => handleLimitEvaluationInput(e.target.value, 'fA')}
                placeholder="Ej: 0"
                className="w-full p-2 border rounded text-sm"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">F({limiteBSegundoTeorema.toFixed(1)}) =</label>
              <input
                type="text"
                value={evaluacionB}
                onChange={(e) => handleLimitEvaluationInput(e.target.value, 'fB')}
                placeholder="Ej: 2"
                className="w-full p-2 border rounded text-sm"
              />
            </div>
          </div>
          
          {errorEvaluacion && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded mt-2">
              {errorEvaluacion}
            </div>
          )}
          <div id="feedback-3" className="feedback"></div>
        </div>

        {/* Paso 4: Resultado final */}
        <div id="step-4" className="step-container bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800 mb-2 flex items-center gap-2">
            <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
            Paso 4: Resultado final
          </h3>
          <div className="text-center">
            <div className="text-2xl font-mono mb-2">
              ∫[{limiteASegundoTeorema.toFixed(1)}, {limiteBSegundoTeorema.toFixed(1)}] f(x)dx = F({limiteBSegundoTeorema.toFixed(1)}) - F({limiteASegundoTeorema.toFixed(1)}) = {resultadoIntegral.toFixed(4)}
            </div>
            <div className="text-gray-600">
              ¡Integral calculada usando el Segundo Teorema Fundamental!
            </div>
          </div>
          <div id="feedback-4" className="feedback"></div>
        </div>
      </div>

      {/* Botón Resetear */}
      <Button onClick={handleResetearSegundoTeorema} variant="outline" className="w-full">
        <RotateCcw className="h-4 w-4 mr-2" />
        Resetear Proceso
      </Button>
    </div>
  )
}
