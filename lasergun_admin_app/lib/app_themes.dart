import 'package:flutter/material.dart';
import './loggings.dart';
import './app.dart';

/// AppTheme class.
class AppTheme {
  static AppTheme? _instance;

  static AppTheme instance() {
    _instance ??= AppTheme();
    return _instance!;
  }

  // ----------------------------------------------------------------------

  static final log = Logger('AppTheme');

  /// Construction.
  AppTheme();

  /// Material color list.
  static List<MaterialColor> themeList = [
    Colors.blue,
    Colors.lightBlue,
    Colors.cyan,
    Colors.teal,
    Colors.green,
    Colors.lightGreen,
    Colors.lime,
    Colors.yellow,
    Colors.amber,
    Colors.orange,
    Colors.deepOrange,
    Colors.red,
    Colors.purple,
    Colors.indigo,
    Colors.brown,
    Colors.grey,
  ];

  /// Current theme.
  MaterialColor get current => themeList[_index];
  int _index = 14;

  /// Change current theme.
  void changeTheme(BuildContext context, int index) {
    if (index < 0 || index >= themeList.length) return;

    if (_index != index) {
      _index = index;
      log.info('change theme to $_index');

      App.refresh(context);
    }
  }
}
