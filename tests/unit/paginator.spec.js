import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Paginator from '@/components/Paginator.vue';
import mutations from '@/mutations';
import actions from '@/actions';

const localVue = createLocalVue();
localVue.use(Vuex);

const store = (customState = {}) => new Vuex.Store({
  state: {
    currentPage: 3,
    totalPages: 5,
    ...customState,
  },
  actions: { ...actions },
  mutations: { ...mutations },
});

describe('Paginator.vue', () => {
  it('shows page count', () => {
    const wrapper = shallowMount(Paginator, {
      store,
      localVue,
    });
    expect(wrapper.find('.page-info').text()).toMatch('Página 3 de 5');
  });

  it('shows buttons for all pages', () => {
    const wrapper = shallowMount(Paginator, {
      store,
      localVue,
    });

    expect(wrapper.findAll('.page').length).toBe(5);
    expect(wrapper.findAll('.page').at(0).text()).toBe('1');
    expect(wrapper.findAll('.page').at(1).text()).toBe('2');
    expect(wrapper.findAll('.page').at(2).text()).toBe('3');
    expect(wrapper.findAll('.page').at(3).text()).toBe('4');
    expect(wrapper.findAll('.page').at(4).text()).toBe('5');
  });

  it('disables current page button', () => {
    const wrapper = shallowMount(Paginator, {
      store,
      localVue,
    });

    expect(wrapper.find('.page-3').attributes('disabled')).toBe('disabled');
  });

  it('change page when button is clicked', () => {
    const wrapper = shallowMount(Paginator, {
      store,
      localVue,
    });

    wrapper.find('.page-4').trigger('click');

    expect(wrapper.$store.state).toBe(4);
    expect(wrapper.vm.currentPage).toBe(4);
  });

  it('shows next and previous page buttons', () => {
    const wrapper = shallowMount(Paginator, {
      store,
      localVue,
    });

    expect(wrapper.find('.next-page').exists()).toBe(true);
    expect(wrapper.find('.previous-page').exists()).toBe(true);
  });

  it('goes to next page when click next page button', () => {
    const wrapper = shallowMount(Paginator, {
      store,
      localVue,
    });

    wrapper.find('.next-page').trigger('click');

    expect(wrapper.vm.currentPage).toBe(4);
  });

  it('goes to previous page when click previous page button', () => {
    const wrapper = shallowMount(Paginator, {
      store: store({ currentPage: 2, totalPages: 3 }),
      localVue,
    });

    wrapper.find('.previous-page').trigger('click');

    expect(wrapper.vm.currentPage).toBe(1);
  });

  it('disables previous page button when on first page', () => {
    const wrapper = shallowMount(Paginator, {
      store: store({ currentPage: 1 }),
      localVue,
    });

    expect(wrapper.find('.previous-page').attributes('disabled')).toBe('disabled');
  });

  it('disables next page button when on last page', () => {
    const wrapper = shallowMount(Paginator, {
      store: store({ currentPage: 10, totalPages: 10 }),
      localVue,
    });

    expect(wrapper.find('.next-page').attributes('disabled')).toBe('disabled');
  });

  it('ignores previous and next button clicks if they are disabled', () => {
    const wrapper = shallowMount(Paginator, {
      store: store({ currentPage: 1, totalPages: 1 }),
      localVue,
    });

    const prevBtn = wrapper.find('.previous-page');
    const nextBtn = wrapper.find('.next-page');

    expect(prevBtn.attributes('disabled')).toBe('disabled');
    expect(nextBtn.attributes('disabled')).toBe('disabled');

    prevBtn.trigger('click');
    expect(wrapper.vm.currentPage).toBe(1);

    nextBtn.trigger('click');
    expect(wrapper.vm.currentPage).toBe(1);
  });

  it('emits event when page changes', () => {
    const wrapper = shallowMount(Paginator, {
      store: store({ currentPage: 1, totalPages: 10 }),
      localVue,
    });

    wrapper.find('.next-page').trigger('click');

    expect(wrapper.emitted('pageChanged')[0]).toEqual([2]);
  });
});
