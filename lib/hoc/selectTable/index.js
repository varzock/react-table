'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable */

var defaultSelectInputComponent = function defaultSelectInputComponent(props) {
  return _react2.default.createElement('input', {
    disabled: props.disabled,
    type: props.selectType || 'checkbox',
    checked: props.checked,
    onClick: function onClick(e) {
      var shiftKey = e.shiftKey;

      e.stopPropagation();
      props.onClick(props.id, shiftKey, props.row);
    },
    onChange: function onChange() {}
  });
};

exports.default = function (Component) {

  var wrapper = function (_React$Component) {
    _inherits(RTSelectTable, _React$Component);

    function RTSelectTable(props) {
      _classCallCheck(this, RTSelectTable);

      return _possibleConstructorReturn(this, (RTSelectTable.__proto__ || Object.getPrototypeOf(RTSelectTable)).call(this, props));
    }

    _createClass(RTSelectTable, [{
      key: 'rowSelector',
      value: function rowSelector(row) {
        if (!row || !row.hasOwnProperty(this.props.keyField)) return null;
        var disabled = false;
        // If has prop disableSelection and its function then test each row with it. if true disable input
        if (this.props.hasOwnProperty('disableSelection') && typeof this.props.disableSelection === 'function') {
          disabled = this.props.disableSelection(row);
        }
        var _props = this.props,
            toggleSelection = _props.toggleSelection,
            selectType = _props.selectType,
            keyField = _props.keyField;

        var checked = this.props.isSelected(row[this.props.keyField]);
        var inputProps = {
          checked: checked,
          onClick: toggleSelection,
          selectType: selectType,
          id: row[keyField],
          row: row,
          disabled: disabled
        };
        return _react2.default.createElement(this.props.SelectInputComponent, inputProps);
      }
    }, {
      key: 'headSelector',
      value: function headSelector(row) {
        var selectType = this.props.selectType;

        if (selectType === 'radio') return null;

        var _props2 = this.props,
            toggleAll = _props2.toggleAll,
            checked = _props2.selectAll,
            SelectAllInputComponent = _props2.SelectAllInputComponent;

        var inputProps = {
          checked: checked,
          onClick: toggleAll,
          selectType: selectType
        };

        return _react2.default.createElement(SelectAllInputComponent, inputProps);
      }

      // this is so we can expose the underlying ReactTable to get at the sortedData for selectAll

    }, {
      key: 'getWrappedInstance',
      value: function getWrappedInstance() {
        if (!this.wrappedInstance) console.warn('RTSelectTable - No wrapped instance');
        if (this.wrappedInstance.getWrappedInstance) return this.wrappedInstance.getWrappedInstance();else return this.wrappedInstance;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props3 = this.props,
            originalCols = _props3.columns,
            isSelected = _props3.isSelected,
            toggleSelection = _props3.toggleSelection,
            toggleAll = _props3.toggleAll,
            keyField = _props3.keyField,
            selectAll = _props3.selectAll,
            selectType = _props3.selectType,
            SelectAllInputComponent = _props3.SelectAllInputComponent,
            SelectInputComponent = _props3.SelectInputComponent,
            rest = _objectWithoutProperties(_props3, ['columns', 'isSelected', 'toggleSelection', 'toggleAll', 'keyField', 'selectAll', 'selectType', 'SelectAllInputComponent', 'SelectInputComponent']);

        var select = {
          id: '_selector',
          accessor: function accessor() {
            return 'x';
          }, // this value is not important
          Header: this.headSelector.bind(this),
          Cell: function Cell(ci) {
            return _this2.rowSelector.bind(_this2)(ci.original);
          },
          width: 42,
          filterable: false,
          sortable: false,
          resizable: false,
          style: { textAlign: 'center' }
        };
        var columns = [select].concat(_toConsumableArray(originalCols));
        var extra = {
          columns: columns
        };
        return _react2.default.createElement(Component, _extends({}, rest, extra, { ref: function ref(r) {
            return _this2.wrappedInstance = r;
          } }));
      }
    }]);

    return RTSelectTable;
  }(_react2.default.Component);

  wrapper.displayName = 'RTSelectTable';
  wrapper.defaultProps = {
    keyField: '_id',
    isSelected: function isSelected(key) {
      console.log('No isSelected handler provided:', { key: key });
    },
    selectAll: false,
    toggleSelection: function toggleSelection(key, shift, row) {
      console.log('No toggleSelection handler provided:', { key: key, shift: shift, row: row });
    },
    toggleAll: function toggleAll() {
      console.log('No toggleAll handler provided.');
    },
    selectType: 'check',
    SelectInputComponent: defaultSelectInputComponent,
    SelectAllInputComponent: defaultSelectInputComponent
  };

  return wrapper;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ob2Mvc2VsZWN0VGFibGUvaW5kZXguanMiXSwibmFtZXMiOlsiZGVmYXVsdFNlbGVjdElucHV0Q29tcG9uZW50IiwicHJvcHMiLCJkaXNhYmxlZCIsInNlbGVjdFR5cGUiLCJjaGVja2VkIiwiZSIsInNoaWZ0S2V5Iiwic3RvcFByb3BhZ2F0aW9uIiwib25DbGljayIsImlkIiwicm93IiwiQ29tcG9uZW50Iiwid3JhcHBlciIsImhhc093blByb3BlcnR5Iiwia2V5RmllbGQiLCJkaXNhYmxlU2VsZWN0aW9uIiwidG9nZ2xlU2VsZWN0aW9uIiwiaXNTZWxlY3RlZCIsImlucHV0UHJvcHMiLCJjcmVhdGVFbGVtZW50IiwiU2VsZWN0SW5wdXRDb21wb25lbnQiLCJ0b2dnbGVBbGwiLCJzZWxlY3RBbGwiLCJTZWxlY3RBbGxJbnB1dENvbXBvbmVudCIsIndyYXBwZWRJbnN0YW5jZSIsImNvbnNvbGUiLCJ3YXJuIiwiZ2V0V3JhcHBlZEluc3RhbmNlIiwib3JpZ2luYWxDb2xzIiwiY29sdW1ucyIsInJlc3QiLCJzZWxlY3QiLCJhY2Nlc3NvciIsIkhlYWRlciIsImhlYWRTZWxlY3RvciIsImJpbmQiLCJDZWxsIiwiY2kiLCJyb3dTZWxlY3RvciIsIm9yaWdpbmFsIiwid2lkdGgiLCJmaWx0ZXJhYmxlIiwic29ydGFibGUiLCJyZXNpemFibGUiLCJzdHlsZSIsInRleHRBbGlnbiIsImV4dHJhIiwiciIsImRpc3BsYXlOYW1lIiwiZGVmYXVsdFByb3BzIiwia2V5IiwibG9nIiwic2hpZnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7K2VBRkE7O0FBSUEsSUFBTUEsOEJBQThCLFNBQTlCQSwyQkFBOEIsQ0FBQ0MsS0FBRCxFQUFXO0FBQzdDLFNBQ0U7QUFDRSxjQUFVQSxNQUFNQyxRQURsQjtBQUVFLFVBQU1ELE1BQU1FLFVBQU4sSUFBb0IsVUFGNUI7QUFHRSxhQUFTRixNQUFNRyxPQUhqQjtBQUlFLGFBQVMs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bUI7QUFBRWUsY0FBUTBCLEdBQVIsQ0FBWSxzQ0FBWixFQUFvRCxFQUFFRCxRQUFGLEVBQU9FLFlBQVAsRUFBYzFDLFFBQWQsRUFBcEQ7QUFBMEUsS0FKbEg7QUFLRVcsZUFBVyxxQkFBTTtBQUFFSSxjQUFRMEIsR0FBUixDQUFZLGdDQUFaO0FBQStDLEtBTHBFO0FBTUVoRCxnQkFBWSxPQU5kO0FBT0VpQiwwQkFBc0JwQiwyQkFQeEI7QUFRRXVCLDZCQUF5QnZCO0FBUjNCLEdBREE7O0FBWUEsU0FBT1ksT0FBUDtBQUNELEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBkZWZhdWx0U2VsZWN0SW5wdXRDb21wb25lbnQgPSAocHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8aW5wdXRcbiAgICAgIGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZH1cbiAgICAgIHR5cGU9e3Byb3BzLnNlbGVjdFR5cGUgfHwgJ2NoZWNrYm94J31cbiAgICAgIGNoZWNrZWQ9e3Byb3BzLmNoZWNrZWR9XG4gICAgICBvbkNsaWNrPXsoZSk9PntcbiAgICAgICAgY29uc3QgeyBzaGlmdEtleSB9ID0gZTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcHJvcHMub25DbGljayhwcm9wcy5pZCwgc2hpZnRLZXksIHByb3BzLnJvdyk7XG4gICAgICB9fVxuICAgICAgb25DaGFuZ2U9eygpPT57fX1cbiAgICAvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IChDb21wb25lbnQpID0+IHtcblxuICBjb25zdCB3cmFwcGVyID0gY2xhc3MgUlRTZWxlY3RUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcylcbiAgICB7XG4gICAgICBzdXBlcihwcm9wcyk7XG4gICAgfVxuXG4gICAgcm93U2VsZWN0b3Iocm93KSB7XG4gICAgICBpZighcm93IHx8ICFyb3cuaGFzT3duUHJvcGVydHkodGhpcy5wcm9wcy5rZXlGaWVsZCkpIHJldHVybiBudWxsO1xuICAgICAgbGV0IGRpc2FibGVkID0gZmFsc2U7XG4gICAgICAvLyBJZiBoYXMgcHJvcCBkaXNhYmxlU2VsZWN0aW9uIGFuZCBpdHMgZnVuY3Rpb24gdGhlbiB0ZXN0IGVhY2ggcm93IHdpdGggaXQuIGlmIHRydWUgZGlzYWJsZSBpbnB1dFxuICAgICAgaWYgKHRoaXMucHJvcHMuaGFzT3duUHJvcGVydHkoJ2Rpc2FibGVTZWxlY3Rpb24nKSAmJiB0eXBlb2YgdGhpcy5wcm9wcy5kaXNhYmxlU2VsZWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGRpc2FibGVkID0gdGhpcy5wcm9wcy5kaXNhYmxlU2VsZWN0aW9uKHJvdyk7XG4gICAgICB9XG4gICAgICBjb25zdCB7IHRvZ2dsZVNlbGVjdGlvbiwgc2VsZWN0VHlwZSwga2V5RmllbGQgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBjaGVja2VkID0gdGhpcy5wcm9wcy5pc1NlbGVjdGVkKHJvd1t0aGlzLnByb3BzLmtleUZpZWxkXSk7XG4gICAgICBjb25zdCBpbnB1dFByb3BzID1cbiAgICAgIHtcbiAgICAgICAgY2hlY2tlZCxcbiAgICAgICAgb25DbGljazogdG9nZ2xlU2VsZWN0aW9uLFxuICAgICAgICBzZWxlY3RUeXBlLFxuICAgICAgICBpZDogcm93W2tleUZpZWxkXSxcbiAgICAgICAgcm93LFxuICAgICAgICBkaXNhYmxlZCxcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KHRoaXMucHJvcHMuU2VsZWN0SW5wdXRDb21wb25lbnQsaW5wdXRQcm9wcyk7XG4gICAgfVxuXG4gICAgaGVhZFNlbGVjdG9yKHJvdykge1xuICAgICAgY29uc3QgeyBzZWxlY3RUeXBlIH0gPSB0aGlzLnByb3BzO1xuICAgICAgaWYgKHNlbGVjdFR5cGUgPT09ICdyYWRpbycpIHJldHVybiBudWxsO1xuXG4gICAgICBjb25zdCB7IHRvZ2dsZUFsbCwgc2VsZWN0QWxsOiBjaGVja2VkLCBTZWxlY3RBbGxJbnB1dENvbXBvbmVudCwgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBpbnB1dFByb3BzID1cbiAgICAgIHtcbiAgICAgICAgY2hlY2tlZCxcbiAgICAgICAgb25DbGljazogdG9nZ2xlQWxsLFxuICAgICAgICBzZWxlY3RUeXBlLFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3RBbGxJbnB1dENvbXBvbmVudCxpbnB1dFByb3BzKTtcbiAgICB9XG5cbiAgICAvLyB0aGlzIGlzIHNvIHdlIGNhbiBleHBvc2UgdGhlIHVuZGVybHlpbmcgUmVhY3RUYWJsZSB0byBnZXQgYXQgdGhlIHNvcnRlZERhdGEgZm9yIHNlbGVjdEFsbFxuICAgIGdldFdyYXBwZWRJbnN0YW5jZSgpIHtcbiAgICAgIGlmICghdGhpcy53cmFwcGVkSW5zdGFuY2UpIGNvbnNvbGUud2FybignUlRTZWxlY3RUYWJsZSAtIE5vIHdyYXBwZWQgaW5zdGFuY2UnKTtcbiAgICAgIGlmICh0aGlzLndyYXBwZWRJbnN0YW5jZS5nZXRXcmFwcGVkSW5zdGFuY2UpIHJldHVybiB0aGlzLndyYXBwZWRJbnN0YW5jZS5nZXRXcmFwcGVkSW5zdGFuY2UoKTtcbiAgICAgIGVsc2UgcmV0dXJuIHRoaXMud3JhcHBlZEluc3RhbmNlXG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvbHVtbnM6b3JpZ2luYWxDb2xzLCBpc1NlbGVjdGVkLCB0b2dnbGVTZWxlY3Rpb24sIHRvZ2dsZUFsbCwga2V5RmllbGQsIHNlbGVjdEFsbCxcbiAgICAgICAgc2VsZWN0VHlwZSwgU2VsZWN0QWxsSW5wdXRDb21wb25lbnQsIFNlbGVjdElucHV0Q29tcG9uZW50LFxuICAgICAgICAuLi5yZXN0XG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHNlbGVjdCA9IHtcbiAgICAgICAgaWQ6ICdfc2VsZWN0b3InLFxuICAgICAgICBhY2Nlc3NvcjogKCk9Pid4JywgLy8gdGhpcyB2YWx1ZSBpcyBub3QgaW1wb3J0YW50XG4gICAgICAgIEhlYWRlcjogdGhpcy5oZWFkU2VsZWN0b3IuYmluZCh0aGlzKSxcbiAgICAgICAgQ2VsbDogKGNpKSA9PiB7IHJldHVybiB0aGlzLnJvd1NlbGVjdG9yLmJpbmQodGhpcykoY2kub3JpZ2luYWwpOyB9LFxuICAgICAgICB3aWR0aDogNDIsXG4gICAgICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgICAgICBzb3J0YWJsZTogZmFsc2UsXG4gICAgICAgIHJlc2l6YWJsZTogZmFsc2UsXG4gICAgICAgIHN0eWxlOiB7IHRleHRBbGlnbjogJ2NlbnRlcicgfSxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbHVtbnMgPSBbXG4gICAgICAgIHNlbGVjdCxcbiAgICAgICAgLi4ub3JpZ2luYWxDb2xzLFxuICAgICAgXTtcbiAgICAgIGNvbnN0IGV4dHJhID0ge1xuICAgICAgICBjb2x1bW5zLFxuICAgICAgfTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxDb21wb25lbnQgey4uLnJlc3R9IHsuLi5leHRyYX0gcmVmPXsocik9PnRoaXMud3JhcHBlZEluc3RhbmNlPXJ9Lz5cbiAgICAgIClcbiAgICB9XG4gIH1cblxuICB3cmFwcGVyLmRpc3BsYXlOYW1lID0gJ1JUU2VsZWN0VGFibGUnO1xuICB3cmFwcGVyLmRlZmF1bHRQcm9wcyA9XG4gIHtcbiAgICBrZXlGaWVsZDogJ19pZCcsXG4gICAgaXNTZWxlY3RlZDogKGtleSk9PnsgY29uc29sZS5sb2coJ05vIGlzU2VsZWN0ZWQgaGFuZGxlciBwcm92aWRlZDonLHtrZXl9KX0sXG4gICAgc2VsZWN0QWxsOiBmYWxzZSxcbiAgICB0b2dnbGVTZWxlY3Rpb246IChrZXksIHNoaWZ0LCByb3cpPT57IGNvbnNvbGUubG9nKCdObyB0b2dnbGVTZWxlY3Rpb24gaGFuZGxlciBwcm92aWRlZDonLCB7IGtleSwgc2hpZnQsIHJvdyB9KSB9LFxuICAgIHRvZ2dsZUFsbDogKCkgPT4geyBjb25zb2xlLmxvZygnTm8gdG9nZ2xlQWxsIGhhbmRsZXIgcHJvdmlkZWQuJykgfSxcbiAgICBzZWxlY3RUeXBlOiAnY2hlY2snLFxuICAgIFNlbGVjdElucHV0Q29tcG9uZW50OiBkZWZhdWx0U2VsZWN0SW5wdXRDb21wb25lbnQsXG4gICAgU2VsZWN0QWxsSW5wdXRDb21wb25lbnQ6IGRlZmF1bHRTZWxlY3RJbnB1dENvbXBvbmVudCxcbiAgfVxuXG4gIHJldHVybiB3cmFwcGVyO1xufVxuIl19