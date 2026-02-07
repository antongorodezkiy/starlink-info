import grpc

from spacex.api.device.device_pb2 import Request, GetStatusRequest, GetLocationRequest
from spacex.api.device.device_pb2_grpc import DeviceStub
# XXX: our VPN doesn't allow us to connect anything other thant 88.*
# api_address = '192.168.100.1:9200'
api_address = '192.168.88.250:9200'

def get_starlink_status():
  channel = grpc.insecure_channel(api_address)
  stub = DeviceStub(channel)

  response = {}

  request = Request(get_status = GetStatusRequest())
  apiResponse = stub.Handle(request, timeout=5)
  response['uptime'] = apiResponse.dish_get_status.device_state.uptime_s
  response['ping_drop_rate'] = apiResponse.dish_get_status.pop_ping_drop_rate
  response['ping_latency'] = apiResponse.dish_get_status.pop_ping_latency_ms
  response['throughput'] = apiResponse.dish_get_status.uplink_throughput_bps
  response['obstruction_fraction_obstructed'] = apiResponse.dish_get_status.obstruction_stats.fraction_obstructed
  response['obstruction_valid'] = apiResponse.dish_get_status.obstruction_stats.valid_s
  response['obstruction_duration'] = apiResponse.dish_get_status.obstruction_stats.avg_prolonged_obstruction_duration_s
  response['obstruction_patches_valid'] = apiResponse.dish_get_status.obstruction_stats.patches_valid
  # response['alerts'] = apiResponse.dish_get_status.alerts

  return response

def get_starlink_location():
  channel = grpc.insecure_channel(api_address)
  stub = DeviceStub(channel)

  response = {}

  request = Request(get_location = GetLocationRequest())
  apiResponse = stub.Handle(request)
  response['lat'] = apiResponse.get_location.lla.lat
  response['lon'] = apiResponse.get_location.lla.lon
  response['alt'] = apiResponse.get_location.lla.alt

  return response
