import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Paginator from '@/components/Paginator.vue';
import mutations from '@/mutations';
import actions from '@/actions';

const localVue = createLocalVue();
localVue.use(Vuex);

console.log(actions);

const store = () => new Vuex.Store({
  state: {
    currentPage: 3,
    totalPages: 5,
  },
  actions: { ...actions },
  mutations: { ...mutations },
});

describe('Paginator.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Paginator, {
      store,
      localVue,
    });
    expect(wrapper.text()).toMatch('3');
  });

  it('shows buttons to all pages', () => {
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

  it('when button is clicked, page changes', () => {
    const wrapper = shallowMount(Paginator, {
      store,
      localVue,
    });

    wrapper.find('.page-4').trigger('click');

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


  it('go to next page when click next page button', () => {
    const wrapper = shallowMount(Paginator, {
      store,
      localVue,
    });

    wrapper.find('.next-page').trigger('click');

    expect(wrapper.vm.currentPage).toBe(4);
  });
});
