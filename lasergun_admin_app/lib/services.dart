import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:lasergun_client_dart/lasergun_client_models.dart' as models;
import 'package:lasergun_client_dart/lasergun_client_dart.dart';
import 'package:shared_preferences/shared_preferences.dart';
import './constants.dart';
import './loggings.dart';
import './app_localization.dart';
import './app_themes.dart';

/// Services singleton class.
class Services {
  static Services? _instance;

  static Services instance() {
    _instance ??= Services();
    return _instance!;
  }

  // ----------------------------------------------------------------------

  static final log = Logger('Services');

  /// Construction.
  Services();

  // ----------------------------------------------------------------------

  /// Lasergun client.
  final Client client = Client(baseUri: Constants.baseUri);

  /// Login task.
  void login(
    BuildContext context,
    models.AccountUser user,
    String token,
  ) async {
    // login logic
    client.login(user, token);

    // set login flag
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('user.login', true);

    // set user settings
    AppLocalization.instance().changeLocale(context, client.user!.locale);
    AppTheme.instance().changeTheme(context, client.user!.theme);
    log.info("login to system, welcome :)");
  }

  /// Logout task.
  void logout(
    BuildContext context,
  ) async {
    // logout service.
    RestResult(await http.put(
      client.getUri('authen/logout'),
      headers: client.headers,
    ));

    // remove login flag
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('user.login');

    // move out to first page
    Navigator.popUntil(context, (route) => route.isFirst);
    AppTheme.instance().changeTheme(context, 14);
    log.info("logout from system gracefully :)");

    // logout logic
    client.logout();
  }
}
