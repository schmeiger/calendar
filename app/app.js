angular.module('calendarDemoApp', [])
.controller('calendarCtrl', function($scope) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();

    $scope.date = {
      year : year,
      month : month
    };

    $scope.isCurrentMonth = function(date) {
      return date.getMonth() == $scope.date.month;
    }

    $scope.months = ('january,february,march,april,may,june,july,august,september,october,november,december').split(',');

    var years = [];
    var then = year - 100;
    for(var i=then;i<=year;i++) {
      years.push(i);
    }

    $scope.years = years;

    $scope.$watchCollection('date', function(date) {
      $scope.currentDate = new Date(date.year, date.month, 1);
    });
  })
.directive('myCalendar', function() {
    return {
      terminal: true,
      priority : 1000,
      transclude : 'element',
      link : function(scope, element, attrs, ctrl, transclude) {
        var containerScope = scope.$new(); 
        var container = angular.element('<ul></ul>');
        container.addClass('month');
        element.after(container);

        scope.$watch(attrs.myCalendar, function(date) {
          if(!date) return;

          var range = CalendarRange.getMonthlyRange(date);

          containerScope.$destroy();
          containerScope = scope.$new();
          container.html('');

          angular.forEach(range.days, function(day) {
            var newScope = containerScope.$new();
            newScope.day = day;
            transclude(newScope, function(newElement) {
              container.append(newElement);
            });
          });
        });
      }
    }
  });