<template>
  <div class="form-general">
    <a-form-model :model="form" ref="form" class="custom--data">
      <a-divider dashed>
        <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Indicador de dolor </span>
      </a-divider>
      <PlainIndicator />
      <a-divider dashed>
        <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Examen funcional </span>
      </a-divider>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-row :gutter="16">
            <!-- Columna 1 -->
            <a-col :span="12" class="mb-3"> </a-col>
            <a-col :span="6" class="mb-3">
              <span class="d-block text-center font-weight-bold" :style="{ color: '#1F2022' }"> Der. </span>
            </a-col>
            <a-col :span="6" class="mb-3">
              <span class="d-block text-center font-weight-bold" :style="{ color: '#1F2022' }"> Izq. </span>
            </a-col>
            <!-- Temporal anterior -->
            <a-col :span="12">
              <span class="label"> Temporal anterior </span>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.temporal_previous_right"
                  placeholder="Der."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.temporal_previous_left"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <!-- Temporal Medio -->
            <a-col :span="12">
              <span class="label"> Temporal Medio </span>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.temporal_middle_right"
                  placeholder="Der."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.temporal_middle_left"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <!-- Temporal posterior -->
            <a-col :span="12">
              <span class="label"> Temporal posterior </span>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.temporal_later_right"
                  placeholder="Der."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.temporal_later_left"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                />
              </a-form-model-item>
            </a-col>
            <!-- Tenson temporal -->
            <a-col :span="12">
              <span class="label"> Tenson temporal </span>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.tenson_temporal_right"
                  placeholder="Der."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.tenson_temporal_left"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="8" class="custom--data">
          <a-row :gutter="16">
            <!-- Columna 2 -->
            <a-col :span="12" class="mb-3"> </a-col>
            <a-col :span="6" class="mb-3">
              <span class="d-block text-center font-weight-bold" :style="{ color: '#1F2022' }"> Der. </span>
            </a-col>
            <a-col :span="6" class="mb-3">
              <span class="d-block text-center font-weight-bold" :style="{ color: '#1F2022' }"> Izq. </span>
            </a-col>
            <!-- Mesetero profundo -->
            <a-col :span="12">
              <span class="label"> Mesetero profundo </span>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.mesetero_deep_right"
                  placeholder="Der."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.mesetero_deep_left"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <!-- Mestero superficial -->
            <a-col :span="12">
              <span class="label"> Mestero superficial </span>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.mestero_superficial_right"
                  placeholder="Der."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.mestero_superficial_left"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <!-- Pterigoideo medial -->
            <a-col :span="12">
              <span class="label"> Pterigoideo medial </span>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.pterigoide_medial_right"
                  placeholder="Der."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.pterigoide_medial_left"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <!-- 	Pterigoideo lateral -->
            <a-col :span="12">
              <span class="label"> Pterigoideo lateral </span>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.pterigoideo_side_right"
                  placeholder="Der."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.pterigoideo_side_left"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="8" class="custom--data">
          <a-row :gutter="16">
            <!-- Columna 3 -->
            <a-col :span="12" class="mb-3"> </a-col>
            <a-col :span="6" class="mb-3">
              <span class="d-block text-center font-weight-bold" :style="{ color: '#1F2022' }"> Der. </span>
            </a-col>
            <a-col :span="6" class="mb-3">
              <span class="d-block text-center font-weight-bold" :style="{ color: '#1F2022' }"> Izq. </span>
            </a-col>
            <!-- Esternocleidomastoideo -->
            <a-col :span="12">
              <span class="label"> Esternocleidomastoideo </span>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.esternocleidomastoideo_right"
                  placeholder="Der."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.esternocleidomastoideo_left"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <!-- Digastrico posterior	 -->
            <a-col :span="12">
              <span class="label"> Digastrico posterior </span>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.digastrico_deep_right"
                  placeholder="Der."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.digastrico_deep_left"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <!-- Polo lateral ATM -->
            <a-col :span="12">
              <span class="label"> Polo lateral ATM </span>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.polo_side_atm_right"
                  placeholder="Der."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.polo_side_atm_left"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <!-- 	Polo posterior ATM -->
            <a-col :span="12">
              <span class="label"> Polo posterior ATM </span>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.polo_later_atm_right"
                  placeholder="Der."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="6">
              <a-form-model-item>
                <a-input-number
                  v-model="form.polo_later_atm_left"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
      </a-row>

      <a-divider dashed>
        <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Ruidos articulares </span>
      </a-divider>
      <a-row :gutter="24">
        <a-col :span="24">
          <a-row :gutter="24">
            <a-col :span="6"> <span class="label"> </span> </a-col>
            <a-col :span="9">
              <span class="text-center label"> ATM Derecha </span>
            </a-col>
            <a-col :span="9">
              <span class="text-center label"> ATM Izquierda </span>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <!-- Apertura -->
            <a-col :span="6"> <span class="label"> Apertura </span> </a-col>
            <a-col :span="5">
              <a-form-model-item>
                <a-select
                  placeholder="Seleccione"
                  :options="atmArray"
                  v-model="form.apertura_atm_right_select"
                  :allowClear="true"
                  :disabled="loading || disabledHasDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="4">
              <a-form-model-item class="with-button">
                <a-input
                  v-model="form.apertura_atm_right_mm"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
            <a-col :span="5">
              <a-form-model-item>
                <a-select
                  placeholder="Seleccione"
                  :options="atmArray"
                  v-model="form.apertura_atm_left_select"
                  :allowClear="true"
                  :disabled="loading || disabledHasDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="4">
              <a-form-model-item class="with-button">
                <a-input-number
                  v-model="form.apertura_atm_left_mm"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
            <!-- Cierre -->
            <a-col :span="6"> <span class="label"> Cierre </span> </a-col>
            <a-col :span="5">
              <a-form-model-item>
                <a-select
                  placeholder="Seleccione"
                  :options="atmArray"
                  v-model="form.cierre_atm_right_select"
                  :allowClear="true"
                  :disabled="loading || disabledHasDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="4">
              <a-form-model-item class="with-button">
                <a-input-number
                  v-model="form.cierre_atm_right_mm"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
            <a-col :span="5">
              <a-form-model-item>
                <a-select
                  placeholder="Seleccione"
                  :options="atmArray"
                  v-model="form.cierre_atm_left_select"
                  :allowClear="true"
                  :disabled="loading || disabledHasDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="4">
              <a-form-model-item class="with-button">
                <a-input-number
                  v-model="form.cierre_atm_left_mm"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
            <!-- Lateralidad Derecha	 -->
            <a-col :span="6">
              <span class="label"> Lateralidad Derecha </span>
            </a-col>
            <a-col :span="5">
              <a-form-model-item>
                <a-select
                  placeholder="Seleccione"
                  :options="atmArray"
                  v-model="form.lateral_right_atm_right_select"
                  :allowClear="true"
                  :disabled="loading || disabledHasDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="4">
              <a-form-model-item class="with-button">
                <a-input-number
                  v-model="form.lateral_right_atm_right_mm"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
            <a-col :span="5">
              <a-form-model-item>
                <a-select
                  placeholder="Seleccione"
                  :options="atmArray"
                  v-model="form.lateral_right_atm_left_select"
                  :allowClear="true"
                  :disabled="loading || disabledHasDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="4">
              <a-form-model-item class="with-button">
                <a-input-number
                  v-model="form.lateral_right_atm_left_mm"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
            <!-- Lateralidad Izquierda -->
            <a-col :span="6">
              <span class="label"> Lateralidad Izquierda</span>
            </a-col>
            <a-col :span="5">
              <a-form-model-item>
                <a-select
                  placeholder="Seleccione"
                  :options="atmArray"
                  v-model="form.lateral_left_atm_right_select"
                  :allowClear="true"
                  :disabled="loading || disabledHasDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="4">
              <a-form-model-item class="with-button">
                <a-input-number
                  v-model="form.lateral_left_atm_right_mm"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
            <a-col :span="5">
              <a-form-model-item>
                <a-select
                  placeholder="Seleccione"
                  :options="atmArray"
                  v-model="form.lateral_izquierda_atm_left_select"
                  :allowClear="true"
                  :disabled="loading || disabledHasDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="4">
              <a-form-model-item class="with-button">
                <a-input-number
                  v-model="form.lateral_izquierda_atm_left_mm"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <!-- Trayectoria de Movimiento	 -->
        <a-col :span="8">
          <a-divider dashed>
            <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Trayectoria de Movimiento </span>
          </a-divider>
          <a-row :gutter="16">
            <a-col :span="24">
              <div class="content--movement d-flex justify-content-around" :style="{ marginBottom: '34px' }">
                <MovementPath title="Apertura" v-model="form.movement_path_opening" />
                <MovementPath title="Cierre" :alter="true" v-model="form.movement_path_closing" />
              </div>
            </a-col>
            <!-- Trayectoria de movimiento derecha -->
            <a-col :span="16">
              <span class="label"> Derecha</span>
            </a-col>
            <a-col :span="8">
              <a-form-model-item class="with-button">
                <a-input-number
                  v-model="form.movement_path_right"
                  placeholder="Der."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
            <!-- Trayectoria de movimiento Izquierda -->
            <a-col :span="16">
              <span class="label"> Izquierda</span>
            </a-col>
            <a-col :span="8">
              <a-form-model-item class="with-button">
                <a-input-number
                  v-model="form.movement_path_left"
                  placeholder="Izq."
                  v-mask="'##'"
                  :min="1"
                  :max="10"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
            <!-- Trayectoria de movimiento End Feel -->
            <a-col :span="12">
              <span class="label"> End Feel</span>
            </a-col>
            <a-col :span="12">
              <a-form-model-item>
                <a-select
                  placeholder="Seleccione"
                  :options="endFeelArray"
                  v-model="form.end_feel"
                  :allowClear="true"
                  :disabled="loading || disabledHasDate"
                >
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <!-- Rango de Movimiento -->
        <a-col :span="8">
          <a-divider dashed>
            <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Rango de Movimiento </span>
          </a-divider>
          <a-row :gutter="24">
            <!-- Apertura máx. sin asistencia	 -->
            <a-col :span="16">
              <span class="label"> Apertura máx. sin asistencia </span>
            </a-col>
            <a-col :span="8">
              <a-form-model-item class="with-button">
                <a-input-number
                  v-model="form.apertura_max_any_asistent"
                  placeholder="0"
                  v-mask="'####'"
                  :min="1"
                  :max="9999"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
            <!-- Apertura máx. con asistencia		 -->
            <a-col :span="16">
              <span class="label"> Apertura máx. con asistencia </span>
            </a-col>
            <a-col :span="8">
              <a-form-model-item class="with-button">
                <a-input-number
                  v-model="form.apertura_max_with_asistent"
                  placeholder="0"
                  v-mask="'####'"
                  :min="1"
                  :max="9999"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
            <!-- Protrusión		 -->
            <a-col :span="16">
              <span class="label"> Protrusión </span>
            </a-col>
            <a-col :span="8">
              <a-form-model-item class="with-button">
                <a-input-number
                  v-model="form.protrusion"
                  placeholder="0"
                  v-mask="'####'"
                  :min="1"
                  :max="9999"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
            <!-- Overbite		 -->
            <a-col :span="16">
              <span class="label"> Overbite </span>
            </a-col>
            <a-col :span="8">
              <a-form-model-item class="with-button">
                <a-input-number
                  v-model="form.overbite"
                  placeholder="0"
                  v-mask="'####'"
                  :min="1"
                  :max="9999"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
            <!-- Overjet		 -->
            <a-col :span="16">
              <span class="label"> Overjet </span>
            </a-col>
            <a-col :span="8">
              <a-form-model-item class="with-button">
                <a-input-number
                  v-model="form.overjet"
                  placeholder="0"
                  v-mask="'####'"
                  :min="1"
                  :max="9999"
                  class="hidden-arrows"
                  :disabled="loading || disabledHasDate"
                />
                <span class="ml-3" :style="{ fontSize: '12px', color: '#B9BABA' }"> mm. </span>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <!-- Dolor Distracción -->
        <a-col :span="8">
          <a-divider dashed>
            <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Dolor Distracción </span>
          </a-divider>
          <a-row :gutter="24">
            <!-- Dolor Distracción	 -->
            <a-col :span="24">
              <a-form-model-item class="with-button">
                <a-radio-group v-model="form.pain_distraction_value" :disabled="loading || disabledHasDate">
                  <a-radio :value="1"> Derecha </a-radio>
                  <a-radio :value="2"> Izquierda </a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
            <!-- Compresión directa		 -->
            <a-col :span="24">
              <a-form-model-item class="with-button" label="Compresión directa">
                <a-input
                  v-model="form.pain_distraction_direct_compression"
                  placeholder="Ingrese su valor"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
            <!-- Compresión indirecta	 -->
            <a-col :span="24">
              <a-form-model-item class="with-button" label="Compresión indirecta">
                <a-input
                  v-model="form.pain_distraction_indirect_compression"
                  placeholder="Ingrese su valor"
                  :disabled="loading || disabledHasDate"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-divider dashed>
            <span :style="{ color: '#B9BABA', fontWeight: 600, fontSize: '14px' }"> Otros </span>
          </a-divider>
        </a-col>
        <!-- Diagnóstico -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Diagnóstico">
            <a-textarea v-model="form.diagnosis" :rows="3" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Examen radiológico -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Examen radiológico">
            <a-textarea v-model="form.radiological_examination" :rows="3" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <!-- Otros -->
        <a-col :span="24" :md="24">
          <a-form-model-item label="Otros">
            <a-textarea v-model="form.others" :rows="3" :disabled="loading || disabledHasDate" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24" class="d-flex justify-content-end">
          <a-button type="primary" html-type="submit" @click="submit" :loading="loading" :disabled="disabledHasDate">
            Guardar
          </a-button>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import PlainIndicator from '~/components/sections/diffussion/PlainIndicator'
import MovementPath from '~/components/sections/diffussion/MovementPath'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    PlainIndicator,
    MovementPath,
  },
  props: {
    form: {
      type: Object,
      default: {},
    },
    disabledHasDate: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      atmArray: [
        { value: 1, label: 'Click' },
        { value: 2, label: 'Crepitación' },
      ],
      endFeelArray: [
        { value: 1, label: 'No indicado' },
        { value: 2, label: 'Duro' },
        { value: 3, label: 'Blando' },
      ],
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          this.changeLoading(true)
          let tempForm = this.form
          tempForm.id_patient = this.$route.params.id
          let response = false
          response = await this.$axios.$put(`/diffusion_patient/${tempForm.id}`, tempForm).catch((errors) => {
            this.loading = false
            this.changeLoading(false)
          })
          if (response.success) this.$message.success(response.message)
          this.loading = false
          this.changeLoading(false)
        }
      })
    },
    ...mapActions({
      changeLoading: 'data/diffussion/CHANGE_LOADING',
      getDiffussionPatient: 'data/diffussion/GET_DIFFUSSION_BY_PATIENT',
    }),
  },
}
</script>

<style></style>
