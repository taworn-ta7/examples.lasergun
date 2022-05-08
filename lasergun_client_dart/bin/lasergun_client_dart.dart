import 'package:http/http.dart' as http;
import 'package:lasergun_client_dart/lasergun_client_dart.dart';

void main() async {
  final client = Client.def();
  print('client URI: ${client.baseUri}');

  final RestResult rest = RestResult(
    await http.get(
      client.getUri('test'),
      headers: client.headers,
    ),
  );
  print('REST result: ${rest.ok}');
}
