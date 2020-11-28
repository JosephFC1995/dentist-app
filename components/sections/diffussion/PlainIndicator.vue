<template>
  <div class="indicator-pain mt-3 mb-4">
    <div class="list-indicators-plain">
      <!-- Level 1 -->
      <div class="level-plain">
        <span class="picture">
          <img
            src="/assets/pain-scale/1_pain.png"
            alt="Pain 1"
            srcset="/assets/pain-scale/1_pain.png"
          />
        </span>
        <span class="number"> 0 </span>
        <span class="middle"></span>
        <span class="middle_number">2</span>
        <span class="text"> Sin dolor </span>
      </div>
      <!-- Level 2 -->
      <div class="level-plain">
        <span class="picture">
          <img
            src="/assets/pain-scale/2_pain.png"
            alt="Pain 2"
            srcset="/assets/pain-scale/2_pain.png"
          />
        </span>
        <span class="number"> 2 </span>
        <span class="middle"></span>
        <span class="middle_number">3</span>
        <span class="text"> Leve </span>
      </div>
      <!-- Level 3 -->
      <div class="level-plain">
        <span class="picture">
          <img
            src="/assets/pain-scale/3_pain.png"
            alt="Pain 3"
            srcset="/assets/pain-scale/3_pain.png"
          />
        </span>
        <span class="number"> 4 </span>
        <span class="middle"></span>
        <span class="middle_number">5</span>
        <span class="text"> Moderado </span>
      </div>
      <!-- Level 4 -->
      <div class="level-plain">
        <span class="picture">
          <img
            src="/assets/pain-scale/4_pain.png"
            alt="Pain 4"
            srcset="/assets/pain-scale/4_pain.png"
          />
        </span>
        <span class="number"> 6 </span>
        <span class="middle"></span>
        <span class="middle_number">7</span>
        <span class="text"> Angustioso </span>
      </div>
      <!-- Level 5 -->
      <div class="level-plain">
        <span class="picture">
          <img
            src="/assets/pain-scale/5_pain.png"
            alt="Pain 5"
            srcset="/assets/pain-scale/5_pain.png"
          />
        </span>
        <span class="number"> 8 </span>
        <span class="middle"></span>
        <span class="middle_number">9</span>
        <span class="text"> Severo </span>
      </div>
      <!-- Level 6 -->
      <div class="level-plain">
        <span class="picture">
          <img
            src="/assets/pain-scale/6_pain.png"
            alt="Pain 6"
            srcset="/assets/pain-scale/6_pain.png"
          />
        </span>
        <span class="number"> 10 </span>
        <span class="text"> Insoportable </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.indicator-pain {
  display: flex;
  justify-content: center;
  .list-indicators-plain {
    display: flex;
    padding: 1rem 0;
    .level-plain {
      position: relative;
      width: 7rem;
      height: 8rem;
      padding: 0 0rem;
      &::before {
        content: '';
        content: '';
        position: absolute;
        height: 2px;
        left: 50%;
        width: 100%;
        background: #1f2022;
        top: 50%;
        transform: translateY(-50%);
      }
      &::after {
        content: '';
        content: '';
        position: absolute;
        height: 10px;
        left: 50%;
        width: 2px;
        background: #1f2022;
        top: 50%;
        transform: translateY(-50%);
      }
      .middle {
        position: absolute;
        height: 10px;
        left: 100%;
        width: 2px;
        background: #1f2022;
        top: 50%;
        transform: translateY(-50%);
      }
      &:last-child {
        &::before {
          display: none;
        }
      }
      .picture {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
        img {
          width: 45px;
          transition: 0.3s all;
        }
        &:hover {
          img {
            transform: scale(1.1);
          }
        }
      }
      .picture:hover + .number {
        transform: translateX(-50%) translateY(0.8rem);
      }
      .number {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(1rem);
        background: #336cfb;
        color: #fff;
        font-weight: 600;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        transition: 0.3s all;
      }
      .middle_number {
        position: absolute;
        left: 100%;
        top: 50%;
        transform: translateX(-50%) translateY(1rem);
        font-weight: 600;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
      }
      .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(3rem);
        color: #1f2022;
        font-weight: 600;
        text-align: center;
        font-size: 11px;
      }
    }
  }
}
</style>
