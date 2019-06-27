---
path: "/test-react-hoc"
date: "2019-06-16"
title: "Testing React Higher Order Components with Enzyme (plus Redux)"
tags: ["react", "redux", "tdd", "hoc", "javascript", "enzyme"]
excerpt: "When practicing proper Test Driven Development, it can be a major roadblock to realize that you don't know how to test code that you need to write. I ran into this problem myself and scoured Google..."
---
When practicing proper Test Driven Development, it can be a major roadblock to realize that you don't know how to test code that you need to write. I ran into this problem myself and scoured Google and couldn't find any resources at all on the topic, so I decided to share what I learned on the way.

This particular HOC is being used to check whether a user is authenticated, according to the Redux State, and redirecting them to a Login Route if they are not.

## Writing the First Test
Right away we know a few things to be true about the component that we're going to be testing and what our test will need to do.

1. It's connected to Redux, so it will need a mocked Store
2. We need a test component
3. We can *probably* just shallow render this component.

Knowing that much information we could write this test:
```react
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import withAuthentication from './withAuthentication';

const mockStore = configureStore();
test('redirects to Login when isAuthenticated is false', () => {
    const Component = () => {
        return <h1>test values</h1>;
    };
    const ConditionalComponent = withAuthentication(Component);
    const store = mockStore({
        auth: {
            isAuthenticated: false
        }
    });
    const wrapper = shallow(<ConditionalComponent store={store} />).dive();
    const redirectComponent = wrapper.filterWhere(
        (item) => item.prop('to') === '/' && item.name() === 'Redirect'
    );
    expect(redirectComponent).toHaveLength(1);
});
```
### What the Heck is .dive()!?
Good question!

This is a concept that has tripped me up more than once, but .dive() is essentially saying, 'hey that wrapper that we have, let's dive a level deeper into its child component, and then the wrapper will reference that one...'

So, on the regular shallow(), we are entering the top level of our HOC, but by definition a HOC is a function (or a component) that returns another component, so we need to *dive* into the inner component!

This will all make much more sense once we implement the HOC.

The documentation for dive can be found [here](https://airbnb.io/enzyme/docs/api/ShallowWrapper/dive.html)

### The Rest of the Tests
Now that we're past .dive(), the expect() statement looks odd too. From what I've found this is the only way to test a functional HOC that returns a function. There will be a child element with prop to='/' and name of Redirect that should look familiar because it's just another way of describing a component:

```js
<Redirect to='/' />
```

## HOC for First Test

Writing this test 'forces' us to write a decent amount of code in order to get this first test to pass, including hooking up our Redux Store to our component.

Let's start with writing the skeleton of the function('s):

```js
const withAuthentication = (Component) => {
    const wrapped = ({ isAuthenticated, ...rest }) => (
        isAuthenticated ? null: <Redirect to='/login' />
    );
    return wrapped;
};
```
Once we have a skeleton, we can add all of the Redux State Management:

```js
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

const composedWithAuthentication = compose(
    connect(mapStateToProps, null),
    withAuthentication
);
export default composedWithAuthentication;
```
### Compose
While compose isn't entirely necessary in this situation, once you begin adding more HOC's to an app, it's very handy to be able to just comma separate the functions and have the parenthesis and everything managed for you.

### Dispatch
Because this HOC doesn't have a use for dispatch, it's easiest to just not implement the function, pass null in its place to the connect() function and then handle not passing it down within your HOC's prop spread operator.

```js
// By naming dispatch here, we're removing it ...rest,
// which will prevent it from being passed down to
// a component once we implement that feature
const wrapped = ({ isAuthenticated, dispatch, ...rest }) => (
    isAuthenticated ? null : <Redirect to='/login' />
);
```
At this point, our test should pass.

## Writing the Second Test
Our second test is going to look a lot like the first, save for a couple of lines and an extra .dive()

```js
test('displays provided Component when isAuthenticated is true', () => {
    const Component = () => {
        return <h1>test values</h1>;
    };
    const ConditionalComponent = withAuthentication(Component);
    const store = mockStore({
        auth: {
            isAuthenticated: true
        }
    });
    const wrapper = shallow(<ConditionalComponent store={store} />).dive().dive();
    expect(wrapper.find('h1')).toHaveLength(1);
});
```
The extra .dive() is necessary here because not only do we have to get into the second function, but we need to get into the actual component that it's rendering as well in order to test that it actually is rendered to the DOM.

## Making the Second Test Pass
Making this test pass is pretty easy with what we have already, as we just need to update our ternary statement to look like this:

```js
isAuthenticated ? <Component {...rest} /> : <Redirect to='/login' />
```

## Adding PropTypes
The last step to properly testing our component is to add PropTypes to the functions like so:
```js
const withAuthentication = (Component) => {
    const wrapped = ({ isAuthenticated, dispatch, ...rest }) => (
        isAuthenticated ? <Component {...rest} /> : <Redirect to='/login' />
    );
    wrapped.propTypes = {
        isAuthenticated: PropTypes.bool,
        dispatch: PropTypes.func
    };
    return wrapped;
};

withAuthentication.propTypes = {
    Component: PropTypes.element
};
```

# Final Files

In the end, our withAuthentication.test.js file will look like this:
*note:* I've added a describe statement to wrap the tests, and moved the mockStore up.

```js
// withAuthentication.test.js
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import withAuthentication from './withAuthentication';

const mockStore = configureStore();
describe('withAuthentication', () => {
    test('redirects to Login when isAuthenticated is false', () => {
        const Component = () => {
            return <h1>test values</h1>;
        };
        const ConditionalComponent = withAuthentication(Component);
        const store = mockStore({
            auth: {
                isAuthenticated: false
            }
        });
        const wrapper = shallow(<ConditionalComponent store={store} />).dive();
        const redirectComponent = wrapper.filterWhere(
            (item) => item.prop('to') === '/' && item.name() === 'Redirect'
        );
        expect(redirectComponent).toHaveLength(1);
    });

    test('displays provided Component when isAuthenticated is true', () => {
        const Component = () => {
            return <h1>test values</h1>;
        };
        const ConditionalComponent = withAuthentication(Component);
        const store = mockStore({
            auth: {
                isAuthenticated: true
            }
        });
        const wrapper = shallow(<ConditionalComponent store={store} />).dive().dive();
        expect(wrapper.find('h1')).toHaveLength(1);
    });
});
```

and our final component will look like this:

```js
// withAuthentication.js
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

const withAuthentication = (Component) => {
    const wrapped = ({ isAuthenticated, dispatch, ...rest }) => (
        isAuthenticated ? <Component {...rest} /> : <Redirect to='/login' />
    );
    wrapped.propTypes = {
        isAuthenticated: PropTypes.bool,
        dispatch: PropTypes.func
    };
    return wrapped;
};

withAuthentication.propTypes = {
    Component: PropTypes.element
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

const composedWithAuthentication = compose(
    connect(mapStateToProps, null),
    withAuthentication
);
export default composedWithAuthentication;
```
## Summary

Once you understand what a test for a HOC can look like, it makes the entire process significantly easier. Hopefully this article helps, please let me know if you have any questions or feedback!