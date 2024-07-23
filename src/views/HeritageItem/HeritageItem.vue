<script lang="ts">
export default {
  name: 'HeritageItem'
}
</script>

<script setup lang="ts">
import route2021 from '@/assets/images/heritage-item/route-2021.png'
import route2022 from '@/assets/images/heritage-item/route-2022.png'
import route2023 from '@/assets/images/heritage-item/route-2023.png'
import route2024 from '@/assets/images/heritage-item/route-2024.png'

import Content from "./components/Content.vue";

const route = useRoute()

document.title = String(route.params.year)

const image = computed(() => {
  switch (route.params.year) {
    case '2021':
      return route2021
    case '2022':
      return route2022
    case '2023':
      return route2023
    case '2024':
      return route2024
    default:
      return ''
  }
})

const date = computed(() => {
  switch (route.params.year) {
    case '2021':
      return '2021.07.10 - 2021.07.11'
    case '2022':
      return '2022.07.15 - 2022.07.17'
    case '2023':
      return '2023.07.14 - 2023.07.16'
    case '2024':
      return '2024.07.19 - 2024.07.21'
    default:
      return ''
  }
})

const place = computed(() => {
  switch (route.params.year) {
    case '2021':
      return '56.229727 84.976918'
    case '2022':
      return '56.361983 84.951603'
    case '2023':
      return '56.135156 84.982463'
    case '2024':
      return '56.373234 84.962397'
    default:
      return ''
  }
})

const distance = computed(() => {
  switch (route.params.year) {
    case '2021':
      return '105 км'
    case '2022':
      return '102 км'
    case '2023':
      return '117 км'
    case '2024':
      return '103 км'
    default:
      return ''
  }
})

const climb = computed(() => {
  switch (route.params.year) {
    case '2021':
      return '1434 м'
    case '2022':
      return '1398 м'
    case '2023':
      return '1582 м'
    case '2024':
      return '1397 м'
    default:
      return ''
  }
})

const quantity = computed(() => {
  switch (route.params.year) {
    case '2021':
      return 'x'
    case '2022':
      return 'x'
    case '2023':
      return 'x'
    case '2024':
      return '35'
    default:
      return ''
  }
})

const way = computed(() => {
  switch (route.params.year) {
    case '2021':
      return '2021.kmz'
    case '2022':
      return '2022.kmz'
    case '2023':
      return '2023.kmz'
    case '2024':
      return '2024.kmz'
    default:
      return ''
  }
})

const file = computed(() => {
  switch (route.params.year) {
    case '2021':
      return 'urochishe_2021.kmz'
    case '2022':
      return 'urochishe_2022.kmz'
    case '2023':
      return 'urochishe_2023.kmz'
    case '2024':
      return 'urochishe_2024.kmz'
    default:
      return ''
  }
})

const downloadFile = () => {
  const link = document.createElement('a');
  link.href = `/${file.value}`;
  link.target = '_blank';
  link.download = file.value;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

</script>

<template>
  <div class="heritage-item">
    <div class="heritage-item__info">
      <div class="heritage-item__dates">
        <p>даты: {{ date }}</p>
        <p>место: {{ place }}</p>
        <p>дистанция: {{ distance }}</p>
        <p>набор высоты: {{ climb }}</p>
        <p>количество участников: {{ quantity }}</p>
        <p>маршрут: <span class="heritage-item__way" @click="downloadFile">{{ way }}</span></p>
      </div>

      <img :src="image" :alt="route.params.year" :class="`heritage-item__image-${route.params.year}`">
    </div>
    <div class="heritage-item__content">
      <Content v-if="route.params.year === '2021'">
        <div>
          <p>зачет:</p>
          <p>ПРО Мужчины</p>
          <br>
          <p>МТБ</p>
          <p>1. Андрей Рейтер</p>
          <br>
          <p>ГРЭВЕЛ</p>
          <p>1. Денис Дедков (Москва)</p>
          <p>2. Георгий Грезин (Томск)</p>
          <p>3. Анатолий Васильев (Томск)</p>
          <br>
          <p>ФИКС</p>
          <div class="heritage-item__list">
            <span>
              1.
            </span>
            <p>Павел Еркаев (Томск)</p>
            <span>
              2.
            </span>
            <p>Егор Вострицев и Александр Рассамахин (Томск)</p>
          </div>
        </div>
        <div>
          <br>
          <p>ЛАЙТ Мужчины</p>
          <br>
          <p>МТБ</p>
          <p>1. Степан Кузьменко (Томск)</p>
          <p>2. Герман Курмель (Северск)</p>
          <div class="heritage-item__list">
            <span>3.</span>
            <span>Дмитрий Франк и Антон Кундинов (Томск)</span>
          </div>
          <br>
          <p>ГРЭВЕЛ</p>
          <p>1. Марат Бакиров (Томск)</p>
          <p>2. Дмитрий Хмуров (Новосибирск)</p>
          <p>3. Леонид Борзых (Новосибирск)</p>
          <br>
          <p>ФИКС</p>
          <p>1. Роб (Москва)</p>
          <p>2. Рома Кикер (Томск)</p>
          <p>3. Слава Мейнснер (Томск)</p>
        </div>
        <div>
          <br>
          <p>ПРО Женщины</p>
          <br>
          <p>ГРЭВЕЛ</p>
          <p>1. Валентина Ермошкина (Новосибирск)</p>
          <br>
          <p>ЛАЙТ Женщины</p>
          <br>
          <p>ГРЭВЕЛ</p>
          <p>2. Варя Гурова (Москва)</p>
        </div>
      </Content>
      <Content v-else-if="route.params.year === '2022'">
        <div>
          <p>зачет:</p>
          <p>Категория ГОНЩИК</p>
          <br>
          <p>RIGID</p>
          <p>1. Сергей Бутько (Новосибирск)</p>
          <p>2. Денис Федоров (Томск)</p>
          <p>3. Дмитрий Иващенко (Новосибирск)</p>
          <br>
          <p>HARDTAIL</p>
          <p>1. Дмитрий Франк (Томск) (абсолют)</p>
          <p>2. Алексей Аблаев (Томск)</p>
          <p>3. Алексей Вардугин (Кемерово)</p>
        </div>
        <div>
          <br>
          <p>Категория ИССЛЕДОВАТЕЛЬ</p>
          <br>
          <p>1. Сергей Иванов (Томск)</p>
          <p>2. Ориджинал Фил и Персефона</p>
          <p>3. Влад Шадрив</p>
        </div>
        <div>
          <br>
          <p>номинация</p>
          <br>
          <p>Павел Еркаев (маршрут пройден на фиксе)</p>
        </div>
      </Content>
      <Content v-else-if="route.params.year === '2023'">
        <div>
          <p>зачет:</p>
          <p>Категория ГОНЩИК Мужчины</p>
          <br>
          <p>МТБ</p>
          <p>1. Андрей Рейтер (Томск)</p>
          <p>2. Денис Горбачев (Томск)</p>
          <p>3. Анатолий Борисенко (Томск)</p>
          <br>
          <p>ГРЭВЕЛ</p>
          <p>1. Сергей Павлов (Томск) (абсолют)</p>
          <p>2. Дмитрий Франк (Томск)</p>
          <p>3. Сергей Бутько (Новосибирск)</p>
          <br>
          <p>ФИКС</p>
          <p>1. Самуил Лесков (Новосибирск)</p>
        </div>
        <div>
          <br>
          <p>Категория ГОНЩИК Женщины</p>
          <br>
          <p>1. Катя Берг (Томск) (МТБ)</p>
          <p>2. Ирина Харитонова (Томск) (ГРЭВЕЛ)</p>
          <p>3. Евгения Смородина (Томск) (МТБ)</p>
        </div>
        <div>
          <br>
          <p>Категория ИССЛЕДОВАТЕЛЬ</p>
          <br>
          <p>1. Герман Курмель (Северск)</p>
          <p>2. Павел Еркаев (Томск)</p>
          <p>3. Сергей Иванов (Томск)</p>
        </div>
      </Content>
      <Content v-else-if="route.params.year === '2024'">
        <div>
          <p>зачет:</p>
          <p>Категория ГОНЩИК Мужчины</p>
          <br/>
          <p>МТБ</p>
          <p>1. Вячеслав Антонов (Томск)</p>
          <p>2. Евгений Крысенко (Новосибирск)</p>
          <p>3. Олег Фролов (Кемерово)</p>
          <br/>
          <p>ГРЭВЕЛ</p>
          <p>1. Сергей Павлов (Томск) (абсолют)</p>
          <p>2. Никита Шульгин (Кемерово)</p>
          <p>3. Влад Новожилов (Новосибирск)</p>
          <br>
          <p>ФИКС</p>
          <p>1. Николай Борисов (Томск)</p>
          <p>2. Эдуард Корнев (Новосибирск)</p>
        </div>
        <div>
          <p>Категория ГОНЩИК Женщины</p>
          <br>
          <br>
          <p>ГРЭВЕЛ</p>
          <p>1. Ольга Дерешева (Томск)</p>
        </div>
        <div>
          <p>Категория ИССЛЕДОВАТЕЛЬ</p>
          <br>
          <br>
          <p>1. Сандро Иванов (Новосибирск)</p>
        </div>
      </Content>
    </div>

    <div class="heritage-item__links" :class="`heritage-item__links-${route.params.year}`">
      <RouterLink :to="{ name: 'home'}">главная</RouterLink>
      <span>|</span>
      <RouterLink :to="{ name: 'heritage'}">наследие</RouterLink>
      <span>|</span>
      <span>{{ route.params.year }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./HeritageItem.scss"></style>

<style lang="scss" scoped src="./HeritageItem.mobile.scss"></style>
